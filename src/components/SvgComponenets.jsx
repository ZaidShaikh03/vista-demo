import React, { memo } from "react";

const MemoizedPolygon = memo(
  ({ points, title, sx, onClick, onMouseEnter, onMouseLeave }) => (
    <polygon
      points={points}
      title={title}
      style={sx}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    />
  )
);

const MemoizedPath = memo(({ d, stroke, strokeWidth, style }) => (
  <path d={d} stroke={stroke} strokeWidth={strokeWidth} style={style} />
));

const MemoizedCircle = memo(({ cx, cy, r, fill, className, title }) => (
  <circle
    cx={cx}
    cy={cy}
    r={r}
    fill={fill}
    className={className}
    title={title}
  />
));

const MemoizedForeignObject = memo(
  ({ x, y, width, height, style, children }) => (
    <foreignObject x={x} y={y} width={width} height={height} style={style}>
      {children}
    </foreignObject>
  )
);

export { MemoizedPolygon, MemoizedPath, MemoizedCircle, MemoizedForeignObject };
