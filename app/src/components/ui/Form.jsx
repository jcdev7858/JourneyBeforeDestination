import React, { createContext, useContext, useState, useCallback } from "react";

/**
 * Lightweight Form + Form.Item - Drop-in replacement for Ant Design's <Form>
 *
 * Form Props:
 *   Value & State:    formValues, onFormChange, onFieldChange
 *   Behavior:         onSubmit, disabled, readOnly, layout ("vertical"/"horizontal")
 *   Identity:         id, name
 *   Styling:          style, className
 *
 * Form.Item Props:
 *   Field:            name (key in formValues), label
 *   Validation:       required, validate
 *   Value Mapping:    valuePropName, getValueFromEvent, transform
 *   Display:          helpText
 *   Styling:          style, className
 *
 * Value injection via React.cloneElement - Form.Item injects value/onChange
 * into its single child element automatically.
 *
 * Zero dependencies.
 */

// ==========================================================================
// CONTEXT
// ==========================================================================
const FormContext = createContext(null);

// ==========================================================================
// DEFAULT VALUE EXTRACTION (mirrors AntD's defaultGetValueFromEvent)
// ==========================================================================
// Input/InputNumber:  onChange(event)       → event.target.value
// Switch:             onChange(boolean)     → boolean directly
// Select/Slider:      onChange(value)       → value directly
// ColorPicker:        onChange(obj, hex)    → obj directly (use getValueFromEvent for hex)
const extractValue = (valuePropName, ...args) => {
  const event = args[0];
  if (event?.target && valuePropName in event.target) {
    return event.target[valuePropName];
  }
  return event;
};

// ==========================================================================
// FORM
// ==========================================================================
const FORM_KNOWN_PROPS = new Set([
  "formValues",
  "onFormChange",
  "onFieldChange",
  "onSubmit",
  "disabled",
  "readOnly",
  "layout",
  "id",
  "name",
  "style",
  "className",
  "children",
]);

const Form = (props) => {
  const {
    // Value & State
    formValues = {},
    onFormChange,
    onFieldChange,
    // Behavior
    onSubmit,
    disabled,
    readOnly,
    layout = "vertical",
    // Identity
    id,
    name,
    // Styling
    style,
    className,
    children,
  } = props;

  // Fail fast: surface unknown props during development
  if (!import.meta.env.PROD) {
    const unknown = Object.keys(props).filter((k) => !FORM_KNOWN_PROPS.has(k));
    if (unknown.length) {
      console.error(
        `[ui/Form] Unknown props: ${unknown.join(", ")}. ` +
          "Clean up the call site.",
      );
    }
  }

  const [errors, setErrors] = useState({});

  const setFieldValue = useCallback(
    (fieldName, value) => {
      const newValues = { ...formValues, [fieldName]: value };
      onFormChange?.(newValues);
      onFieldChange?.(fieldName, value, newValues);
    },
    [formValues, onFormChange, onFieldChange],
  );

  const setFieldError = useCallback((fieldName, error) => {
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e?.preventDefault();
      onSubmit?.(formValues);
    },
    [formValues, onSubmit],
  );

  return (
    <FormContext.Provider
      value={{
        formValues,
        setFieldValue,
        errors,
        setFieldError,
        disabled,
        readOnly,
        layout,
      }}
    >
      <form
        onSubmit={handleSubmit}
        id={id}
        name={name}
        className={className}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          ...style,
        }}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
};

// ==========================================================================
// FORM.ITEM
// ==========================================================================
const ITEM_KNOWN_PROPS = new Set([
  "name",
  "label",
  "required",
  "validate",
  "valuePropName",
  "getValueFromEvent",
  "transform",
  "helpText",
  "style",
  "className",
  "children",
]);

const FormItem = (props) => {
  const {
    // Field
    name,
    label,
    // Validation
    required,
    validate,
    // Value Mapping
    valuePropName = "value",
    getValueFromEvent,
    transform,
    // Display
    helpText,
    // Styling
    style,
    className,
    children,
  } = props;

  // Fail fast: surface unknown props during development
  if (!import.meta.env.PROD) {
    const unknown = Object.keys(props).filter((k) => !ITEM_KNOWN_PROPS.has(k));
    if (unknown.length) {
      console.error(
        `[ui/Form.Item] Unknown props: ${unknown.join(", ")}. ` +
          "Clean up the call site.",
      );
    }
  }

  const ctx = useContext(FormContext);
  const value = ctx.formValues[name];
  const error = ctx.errors[name];

  // ========================================================================
  // CHANGE HANDLER
  // ========================================================================
  const handleChange = useCallback(
    (...args) => {
      // 1. Extract raw value
      let rawValue;
      if (getValueFromEvent) {
        rawValue = getValueFromEvent(...args);
      } else {
        rawValue = extractValue(valuePropName, ...args);
      }

      // 2. Transform before storing
      const finalValue = transform ? transform(rawValue) : rawValue;

      // 3. Validate
      if (required && (finalValue === "" || finalValue == null)) {
        ctx.setFieldError(name, `${label || name} is required`);
      } else if (validate) {
        const result = validate(finalValue);
        ctx.setFieldError(name, result === true ? null : result);
      } else {
        ctx.setFieldError(name, null);
      }

      // 4. Store
      ctx.setFieldValue(name, finalValue);
    },
    [
      name,
      ctx,
      getValueFromEvent,
      valuePropName,
      transform,
      required,
      validate,
      label,
    ],
  );

  // ========================================================================
  // INJECT PROPS INTO CHILD
  // ========================================================================
  const child = React.Children.only(children);
  const originalOnChange = child.props.onChange;

  const controlProps = {
    [valuePropName]: value,
    onChange: (...args) => {
      handleChange(...args);
      originalOnChange?.(...args);
    },
  };

  // Cascade form-level disabled/readOnly
  if (ctx.disabled) controlProps.disabled = true;
  if (ctx.readOnly) controlProps.readOnly = true;

  const isHorizontal = ctx.layout === "horizontal";

  // ========================================================================
  // RENDER
  // ========================================================================
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: isHorizontal ? "row" : "column",
        gap: isHorizontal ? 12 : 4,
        alignItems: isHorizontal ? "center" : "stretch",
        ...style,
      }}
    >
      {label && (
        <label
          style={{
            color: "#e0e0e0",
            fontSize: 13,
            fontWeight: 500,
            minWidth: isHorizontal ? 100 : undefined,
            flexShrink: isHorizontal ? 0 : undefined,
          }}
        >
          {label}
          {required && (
            <span style={{ color: "#f87171", marginLeft: 4 }}>*</span>
          )}
        </label>
      )}
      <div style={{ flex: 1 }}>
        {React.cloneElement(child, controlProps)}
        {(error || helpText) && (
          <span
            style={{
              display: "block",
              fontSize: 12,
              color: error ? "#f87171" : "#666",
              marginTop: 4,
            }}
          >
            {error || helpText}
          </span>
        )}
      </div>
    </div>
  );
};

Form.Item = FormItem;

export default Form;
