import type { CircleShapeData } from "./circle";
import type { RectShapeData } from "./rect";

export * from "./BaseShape";
export * from "./circle";
export * from "./rect";

export type ShapeData = RectShapeData | CircleShapeData;
export type ShapeType = ShapeData["type"]; // "rect" | "circle"
