import Button from "./ui/Button";
import { Link } from "react-router-dom";

const NavigationLink = ({ text, to, icon, type = "primary" }) => {
  const color = type === "muted" ? "var(--text-muted)" : "var(--accent)";

  return (
    <Link to={to}>
      <Button icon={icon} type="link" style={{ color }}>
        {text}
      </Button>
    </Link>
  );
};

export default NavigationLink;
