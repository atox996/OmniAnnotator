import { vec2 } from "gl-matrix";

import type { CircleAnnotationData } from "./types";

export function getCircleGeometry(
  start: vec2,
  current: vec2,
): CircleAnnotationData {
  const cx = start[0];
  const cy = start[1];
  const r = vec2.distance(start, current);
  return { type: "circle", cx, cy, r };
}
