import React from "react";

/**
 * Grid - Lightweight 2D grid layout with indexed cell placement
 *
 * Features:
 *   - Define grid dimensions with cols × rows
 *   - Place any content at any 1-indexed position via Grid.Cell
 *   - Configurable gutter between cells
 *   - Ghost overlay showing cell indices (debug prop)
 *   - Per-cell style/className customization
 *   - Empty cells render as transparent placeholders
 *
 * Usage:
 *   <Grid cols={12} rows={7} gutter={4} showIndices>
 *     <Grid.Cell index={1} style={{ background: "red" }}>
 *       <Input />
 *     </Grid.Cell>
 *     <Grid.Cell index={15}>
 *       <Text>Obstacle</Text>
 *     </Grid.Cell>
 *   </Grid>
 *
 * Index mapping (1-indexed, left-to-right, top-to-bottom):
 *   cols=4, rows=3:
 *     [ 1][ 2][ 3][ 4]
 *     [ 5][ 6][ 7][ 8]
 *     [ 9][10][11][12]
 *
 * Zero dependencies.
 */

const KNOWN_GRID_PROPS = new Set([
  "cols",
  "rows",
  "gutter",
  "cellSize",
  "showIndices",
  "style",
  "className",
  "children",
  "cellStyle",
  "indexStyle",
]);

const KNOWN_CELL_PROPS = new Set([
  "index",
  "style",
  "className",
  "children",
  "onClick",
  "onMouseEnter",
  "onMouseLeave",
]);

// ==========================================================================
// GRID.CELL - declares content at a specific grid position
// ==========================================================================
const Cell = ({ children }) => children ?? null;
Cell.displayName = "Grid.Cell";

// ==========================================================================
// GRID - CSS Grid container with indexed cell rendering
// ==========================================================================
const Grid = (props) => {
  const {
    cols = 4,
    rows = 4,
    gutter = 8,
    cellSize,
    showIndices = false,
    style,
    className,
    children,
    cellStyle: baseCellStyle,
    indexStyle: baseIndexStyle,
  } = props;

  // Dev-only unknown prop warning
  if (!import.meta.env.PROD) {
    const unknown = Object.keys(props).filter((k) => !KNOWN_GRID_PROPS.has(k));
    if (unknown.length) {
      console.error(
        `[ui/Grid] Unknown props: ${unknown.join(", ")}. ` +
          "This component doesn't support these props. Clean up the call site."
      );
    }
  }

  const totalCells = cols * rows;

  // ==========================================================================
  // COLLECT CELL CHILDREN - build a map of index → cell props
  // ==========================================================================
  const cellMap = new Map();

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;
    if (child.type !== Cell) {
      if (!import.meta.env.PROD) {
        console.error(
          "[ui/Grid] Direct children must be <Grid.Cell>. " +
            `Got <${child.type?.displayName || child.type?.name || child.type}>.`
        );
      }
      return;
    }

    const { index } = child.props;
    if (index == null) {
      if (!import.meta.env.PROD) {
        console.error("[ui/Grid] <Grid.Cell> requires an index prop (1-indexed).");
      }
      return;
    }

    // Dev-only: validate index range
    if (!import.meta.env.PROD) {
      if (index < 1 || index > totalCells) {
        console.error(
          `[ui/Grid] Cell index ${index} is out of range. ` +
            `Valid range: 1-${totalCells} (${cols}×${rows} grid).`
        );
      }
      const unknownCell = Object.keys(child.props).filter((k) => !KNOWN_CELL_PROPS.has(k));
      if (unknownCell.length) {
        console.error(`[ui/Grid.Cell] Unknown props on cell ${index}: ${unknownCell.join(", ")}.`);
      }
    }

    cellMap.set(index, child.props);
  });

  // ==========================================================================
  // GRID STYLES
  // ==========================================================================
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: cellSize ? `repeat(${cols}, ${cellSize}px)` : `repeat(${cols}, 1fr)`,
    gridTemplateRows: cellSize ? `repeat(${rows}, ${cellSize}px)` : undefined,
    gap: gutter,
    ...style,
  };

  const defaultCellStyle = {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 260,
    minHeight: "1fr",
    ...baseCellStyle,
  };

  const defaultIndexStyle = {
    position: "absolute",
    top: 2,
    left: 4,
    fontSize: 9,
    fontFamily: "'JetBrains Mono', monospace",
    color: "rgba(255, 255, 255, 0.2)",
    pointerEvents: "none",
    userSelect: "none",
    zIndex: 1,
    lineHeight: 1,
    ...baseIndexStyle,
  };

  // ==========================================================================
  // RENDER
  // ==========================================================================
  return (
    <div className={className} style={gridStyle}>
      {Array.from({ length: totalCells }, (_, i) => {
        const index = i + 1; // 1-indexed
        const cell = cellMap.get(index);
        const cellClassName = cell?.className || "";
        const cellCustomStyle = cell?.style || {};

        return (
          <div
            key={index}
            data-grid-index={index}
            className={cellClassName}
            style={{ ...defaultCellStyle, ...cellCustomStyle }}
            onClick={cell?.onClick}
            onMouseEnter={cell?.onMouseEnter}
            onMouseLeave={cell?.onMouseLeave}
          >
            {showIndices && <span style={defaultIndexStyle}>{index}</span>}
            {cell?.children}
          </div>
        );
      })}
    </div>
  );
};

// Attach Cell as a static property for compound component pattern
Grid.Cell = Cell;

export default Grid;
