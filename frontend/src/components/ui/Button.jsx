export default function Button({
  children,
  variant = "primary", // "primary" | "secondary" | "danger"
  type = "button",
  disabled = false,
  style,
  ...props
}) {
  const base = {
    padding: "10px 14px",
    borderRadius: 10,
    fontWeight: 700,
    cursor: disabled ? "not-allowed" : "pointer",
    border: "1px solid rgba(255,255,255,0.14)",
    transition: "transform 0.05s ease, opacity 0.2s ease, background 0.2s ease",
    opacity: disabled ? 0.6 : 1,
  };

  const variants = {
    primary: {
      background: "rgba(79, 70, 229, 0.95)",
      color: "white",
    },
    secondary: {
      background: "rgba(255,255,255,0.06)",
      color: "white",
    },
    danger: {
      background: "rgba(220, 38, 38, 0.9)",
      color: "white",
    },
  };

  return (
    <button
      type={type}
      disabled={disabled}
      {...props}
      style={{
        ...base,
        ...(variants[variant] ?? variants.primary),
        ...style,
      }}
      onMouseDown={(e) => {
        // liten "press" känsla
        if (!disabled) e.currentTarget.style.transform = "scale(0.98)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {children}
    </button>
  );
}
