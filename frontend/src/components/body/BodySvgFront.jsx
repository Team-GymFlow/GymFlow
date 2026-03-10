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
      d: "M130 128 C145 115, 175 115, 190 128 C175 140, 145 140, 130 128 Z",
    },

    // Biceps (left + right)
    {
      id: 2,
      name: "Biceps",
      d: "M100 148 C95 155, 93 170, 96 182 C102 182, 108 178, 110 170 C112 162, 108 152, 100 148 Z",
    },
    {
      id: 2,
      name: "Biceps",
      d: "M220 148 C225 155, 227 170, 224 182 C218 182, 212 178, 210 170 C208 162, 212 152, 220 148 Z",
    },

    // Shoulders (left + right)
    {
      id: 3,
      name: "Shoulders",
      d: "M105 112 C112 98, 125 96, 132 110 C125 120, 112 120, 105 112 Z",
    },
    {
      id: 3,
      name: "Shoulders",
      d: "M188 110 C195 96, 208 98, 215 112 C208 120, 195 120, 188 110 Z",
    },

    // Triceps (left + right)
    {
      id: 4,
      name: "Triceps",
      d: "M88 150 C84 158, 82 172, 85 184 C90 186, 95 183, 96 178 C94 168, 92 158, 88 150 Z",
    },
    {
      id: 4,
      name: "Triceps",
      d: "M232 150 C236 158, 238 172, 235 184 C230 186, 225 183, 224 178 C226 168, 228 158, 232 150 Z",
    },

    // Abs
    {
      id: 8,
      name: "Abs",
      d: "M145 148 C152 142, 168 142, 175 148 L172 215 C166 222, 154 222, 148 215 Z",
    },

    // Quads (left + right)
    {
      id: 6,
      name: "Quads",
      d: "M140 228 L157 228 L153 320 L135 320 Z",
    },
    {
      id: 6,
      name: "Quads",
      d: "M163 228 L180 228 L185 320 L167 320 Z",
    },
  ];

  return (
    <svg
      viewBox="60 20 200 360"
      width="100%"
      style={{ display: "block" }}
      role="img"
      aria-label="Body front muscles"
    >
      {/* NECK */}
      <path
        d="M150 78 C150 78, 148 88, 148 95 L172 95 C172 88, 170 78, 170 78"
        fill="rgba(255,255,255,0.05)"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
      />

      {/* HEAD */}
      <ellipse
        cx="160"
        cy="55"
        rx="18"
        ry="24"
        fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1.5"
      />

      {/* TORSO */}
      <path
        d="M132 98
           C118 100, 110 108, 108 118
           C106 135, 110 160, 118 185
           C125 210, 130 222, 135 228
           L185 228
           C190 222, 195 210, 202 185
           C210 160, 214 135, 212 118
           C210 108, 202 100, 188 98
           C178 94, 142 94, 132 98 Z"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1.5"
      />

      {/* LEFT ARM */}
      <path
        d="M108 118
           C100 125, 92 140, 88 155
           C84 170, 82 185, 82 198
           C82 208, 84 215, 82 225
           C80 232, 78 238, 80 240
           C82 242, 86 240, 88 235
           C90 225, 90 215, 92 205
           C94 192, 98 178, 104 165
           C108 155, 110 145, 110 135"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1.5"
      />

      {/* RIGHT ARM */}
      <path
        d="M212 118
           C220 125, 228 140, 232 155
           C236 170, 238 185, 238 198
           C238 208, 236 215, 238 225
           C240 232, 242 238, 240 240
           C238 242, 234 240, 232 235
           C230 225, 230 215, 228 205
           C226 192, 222 178, 216 165
           C212 155, 210 145, 210 135"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1.5"
      />

      {/* LEFT LEG */}
      <path
        d="M135 228
           C132 245, 130 270, 128 295
           C126 320, 125 340, 126 355
           C127 362, 130 368, 122 372
           C118 375, 120 378, 128 378
           C135 378, 140 375, 140 370
           C140 365, 138 355, 138 345
           C140 325, 145 300, 148 280
           C150 265, 153 250, 155 235
           L155 228"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1.5"
      />

      {/* RIGHT LEG */}
      <path
        d="M185 228
           C188 245, 190 270, 192 295
           C194 320, 195 340, 194 355
           C193 362, 190 368, 198 372
           C202 375, 200 378, 192 378
           C185 378, 180 375, 180 370
           C180 365, 182 355, 182 345
           C180 325, 175 300, 172 280
           C170 265, 167 250, 165 235
           L165 228"
        fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.15)"
        strokeWidth="1.5"
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
        { id: 1, label: "Chest", x: 160, y: 130 },
        { id: 3, label: "Shoulders", x: 112, y: 108 },
        { id: 3, label: "Shoulders", x: 208, y: 108 },
        { id: 2, label: "Biceps", x: 96, y: 168 },
        { id: 2, label: "Biceps", x: 224, y: 168 },
        { id: 4, label: "Triceps", x: 82, y: 168 },
        { id: 4, label: "Triceps", x: 238, y: 168 },
        { id: 8, label: "Abs", x: 160, y: 185 },
        { id: 6, label: "Quads", x: 143, y: 278 },
        { id: 6, label: "Quads", x: 177, y: 278 },
      ].map((lbl, i) => (
        <text
          key={`label-${i}`}
          x={lbl.x}
          y={lbl.y}
          textAnchor="middle"
          fill={
            selectedId === lbl.id || hoveredId === lbl.id
              ? "#a5b4fc"
              : "rgba(255,255,255,0.25)"
          }
          fontSize="7"
          fontWeight="600"
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          {lbl.label}
        </text>
      ))}
    </svg>
  );
}
