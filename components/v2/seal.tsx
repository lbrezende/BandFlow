import * as React from "react";

type SealProps = {
  color?: string;
  outline?: string;
  size?: number;
  className?: string;
  children?: React.ReactNode;
  points?: number;
  rotate?: number;
};

export function Seal({
  color = "#a89af2",
  outline = "#0c1a18",
  size = 64,
  className,
  children,
  points = 14,
  rotate = 0,
}: SealProps) {
  const cx = 32;
  const cy = 32;
  const outerR = 30;
  const innerR = 25;
  const total = points * 2;
  const pts: string[] = [];
  for (let i = 0; i < total; i++) {
    const a = (i / total) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }
  return (
    <div
      className={className}
      style={{ width: size, height: size, position: "relative" }}
    >
      <svg
        viewBox="0 0 64 64"
        width={size}
        height={size}
        style={{ display: "block", transform: `rotate(${rotate}deg)` }}
      >
        <polygon
          points={pts.join(" ")}
          fill={color}
          stroke={outline}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
      {children && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ color: outline }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
