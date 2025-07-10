import { vec2 } from "gl-matrix";

import type { CircleShapeData } from "./types";

export function getCircleShapeData(
  start: vec2,
  current: vec2,
): CircleShapeData {
  const cx = start[0];
  const cy = start[1];
  const r = vec2.distance(start, current);
  return { type: "circle", cx, cy, r };
}
