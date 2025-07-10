import { vec2 } from "gl-matrix";

import type { RectAnnotationData } from "./types";

export function getRectGeometry(start: vec2, end: vec2): RectAnnotationData {
  const x = Math.min(start[0], end[0]);
  const y = Math.min(start[1], end[1]);
  const width = Math.abs(end[0] - start[0]);
  const height = Math.abs(end[1] - start[1]);
  return { type: "rect", x, y, width, height };
}
