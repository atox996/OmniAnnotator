// 2D 标注类型
export interface Rect2D {
  id: string;
  type: "rect";
  center: { x: number; y: number };
  size: { width: number; height: number };
  rotation?: number; // 角度，度
  userData?: Record<string, unknown>;
}

export interface Circle2D {
  id: string;
  type: "circle";
  center: { x: number; y: number };
  size: { radius: number };
  userData?: Record<string, unknown>;
}

export interface Polygon2D {
  id: string;
  type: "polygon";
  points: { x: number; y: number }[];
  userData?: Record<string, unknown>;
}

export interface Point2D {
  id: string;
  type: "point";
  center: { x: number; y: number };
  userData?: Record<string, unknown>;
}

// 3D 标注类型
export interface Cuboid3D {
  id: string;
  type: "cuboid";
  center: { x: number; y: number; z: number };
  size: { width: number; height: number; depth: number };
  rotation?: { x: number; y: number; z: number };
  userData?: Record<string, unknown>;
}

export interface Sphere3D {
  id: string;
  type: "sphere";
  center: { x: number; y: number; z: number };
  size: { radius: number };
  userData?: Record<string, unknown>;
}

export interface Polygon3D {
  id: string;
  type: "polygon3d";
  points: { x: number; y: number; z: number }[];
  userData?: Record<string, unknown>;
}

export interface Point3D {
  id: string;
  type: "point3d";
  center: { x: number; y: number; z: number };
  userData?: Record<string, unknown>;
}

// 联合类型
export type Annotation2D = Rect2D | Circle2D | Polygon2D | Point2D;
export type Annotation3D = Cuboid3D | Sphere3D | Polygon3D | Point3D;
export type AnnotationAny = Annotation2D | Annotation3D;
