export default function Card({ children, style, ...props }) {
  return (
    <div
      {...props}
      style={{
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.03)",
        borderRadius: 14,
        boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
