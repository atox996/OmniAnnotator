import type { CircleAnnotationData } from "./circle";
import type { RectAnnotationData } from "./rect";

export * from "./BaseAnnotation";
export * from "./circle";
export * from "./rect";

export type AnnotationData = RectAnnotationData | CircleAnnotationData;
export type AnnotationType = AnnotationData["type"]; // "rect" | "circle"
