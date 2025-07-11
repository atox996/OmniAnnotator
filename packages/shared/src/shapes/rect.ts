export interface RectShapeData {
  readonly type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
}

export function isRectShape(data: unknown): data is RectShapeData {
  return Boolean(
    data && typeof data === "object" && "type" in data && data.type === "rect",
  );
}
