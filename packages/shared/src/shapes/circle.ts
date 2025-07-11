export interface CircleShapeData {
  readonly type: "circle";
  cx: number;
  cy: number;
  r: number;
}

export function isCircleShape(data: unknown): data is CircleShapeData {
  return Boolean(
    data &&
      typeof data === "object" &&
      "type" in data &&
      data.type === "circle",
  );
}
