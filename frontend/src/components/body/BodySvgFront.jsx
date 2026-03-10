export default function BodySvgFront({
  selectedId,
  onSelect,
  onHover,
  hoveredId,
}) {
  const base = {
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const fillFor = (id) => {
    if (selectedId === id) return "#6366f1";
    if (hoveredId === id) return "#6366f1";
    return "rgba(255,255,255,0.08)";
  };

  const strokeFor = (id) => {
    if (selectedId === id) return "#a5b4fc";
    if (hoveredId === id) return "#818cf8";
    return "rgba(255,255,255,0.18)";
  };

  const glowFor = (id) => {
    if (selectedId === id)
      return "drop-shadow(0 0 12px rgba(79,70,229,0.8))";
    if (hoveredId === id)
      return "drop-shadow(0 0 8px rgba(99,102,241,0.8))";
    return "none";
  };

  const muscles = [
    // Chest
    {
      id: 1,
      name: "Chest",
      d: "M110 120 C140 95, 180 95, 210 120 C180 135, 140 135, 110 120 Z",
    },

    // Biceps (left + right)
    {
      id: 2,
      name: "Biceps",
      d: "M78 135 C72 145, 70 165, 74 180 C82 180, 88 175, 90 165 C92 155, 88 140, 78 135 Z",
    },
    {
      id: 2,
      name: "Biceps",
      d: "M242 135 C248 145, 250 165, 246 180 C238 180, 232 175, 230 165 C228 155, 232 140, 242 135 Z",
    },

    // Shoulders (left + right)
    {
      id: 3,
      name: "Shoulders",
      d: "M80 110 C95 85, 110 85, 120 110 C110 120, 95 120, 80 110 Z",
    },
    {
      id: 3,
      name: "Shoulders",
      d: "M210 110 C220 85, 235 85, 250 110 C235 120, 220 120, 210 110 Z",
    },

    // Triceps (left + right - outer arm)
    {
      id: 4,
      name: "Triceps",
      d: "M68 140 C62 150, 58 170, 62 185 C66 188, 72 185, 74 180 C70 165, 72 150, 68 140 Z",
    },
    {
      id: 4,
      name: "Triceps",
      d: "M252 140 C258 150, 262 170, 258 185 C254 188, 248 185, 246 180 C250 165, 248 150, 252 140 Z",
    },

    // Abs
    {
      id: 8,
      name: "Abs",
      d: "M140 145 C155 135, 165 135, 180 145 L175 210 C165 220, 155 220, 145 210 Z",
    },

    // Quads (left + right)
    { id: 6, name: "Quads", d: "M135 220 L155 220 L150 310 L130 310 Z" },
    { id: 6, name: "Quads", d: "M165 220 L185 220 L190 310 L170 310 Z" },
  ];

  return (
    <svg
      viewBox="0 0 330 380"
      width="100%"
      style={{ display: "block" }}
      role="img"
      aria-label="Body front muscles"
    >
      {/* HEAD */}
      <path
        d="M165 40
           C150 40, 140 50, 140 65
           C140 80, 150 90, 165 90
           C180 90, 190 80, 190 65
           C190 50, 180 40, 165 40 Z"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.15)"
      />

      {/* BODY SILHOUETTE */}
      <path
        d="M120 95
           C95 115, 90 150, 105 175
           C118 197, 128 220, 128 250
           L128 330
           C128 350, 145 360, 165 360
           C185 360, 202 350, 202 330
           L202 250
           C202 220, 212 197, 225 175
           C240 150, 235 115, 210 95
           C190 80, 140 80, 120 95 Z"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.15)"
      />

      {/* LEFT ARM SILHOUETTE */}
      <path
        d="M95 115 C75 125, 60 160, 55 195 C52 210, 55 220, 60 220 C65 220, 70 210, 72 195 C78 170, 85 150, 100 130"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.12)"
      />

      {/* RIGHT ARM SILHOUETTE */}
      <path
        d="M235 115 C255 125, 270 160, 275 195 C278 210, 275 220, 270 220 C265 220, 260 210, 258 195 C252 170, 245 150, 230 130"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.12)"
      />

      {/* MUSCLES */}
      {muscles.map((m, idx) => (
        <path
          key={`${m.id}-${idx}`}
          d={m.d}
          style={{
            ...base,
            filter: glowFor(m.id),
          }}
          fill={fillFor(m.id)}
          stroke={strokeFor(m.id)}
          strokeWidth="2"
          onMouseEnter={() => onHover?.(m.id)}
          onMouseLeave={() => onHover?.(null)}
          onClick={() => onSelect?.(m.id)}
        >
          <title>{m.name}</title>
        </path>
      ))}

      {/* MUSCLE LABELS */}
      {[
        { id: 1, label: "Chest", x: 160, y: 115 },
        { id: 3, label: "Shoulders", x: 90, y: 100 },
        { id: 3, label: "Shoulders", x: 230, y: 100 },
        { id: 2, label: "Biceps", x: 75, y: 160 },
        { id: 2, label: "Biceps", x: 245, y: 160 },
        { id: 8, label: "Abs", x: 160, y: 180 },
        { id: 6, label: "Quads", x: 140, y: 270 },
        { id: 6, label: "Quads", x: 180, y: 270 },
      ].map((lbl, i) => (
        <text
          key={`label-${i}`}
          x={lbl.x}
          y={lbl.y}
          textAnchor="middle"
          fill={
            selectedId === lbl.id || hoveredId === lbl.id
              ? "#a5b4fc"
              : "rgba(255,255,255,0.3)"
          }
          fontSize="8"
          fontWeight="600"
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          {lbl.label}
        </text>
      ))}
    </svg>
  );
}
