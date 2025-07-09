// 通用几何类型定义

// 2D 形状
export interface RectGeometry {
  type: "rect";
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CircleGeometry {
  type: "circle";
  cx: number;
  cy: number;
  r: number;
}

export interface PolygonGeometry {
  type: "polygon";
  points: { x: number; y: number }[];
}

export interface PolylineGeometry {
  type: "polyline";
  points: { x: number; y: number }[];
}

export interface LineGeometry {
  type: "line";
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

// 3D 形状
export interface CuboidGeometry {
  type: "cuboid";
  points: { x: number; y: number; z: number }[]; // 8个顶点
}

export interface Polygon3DGeometry {
  type: "polygon3d";
  points: { x: number; y: number; z: number }[];
}

export interface SphereGeometry {
  type: "sphere";
  cx: number;
  cy: number;
  cz: number;
  r: number;
}

// Geometry 联合类型
export type Geometry =
  | RectGeometry
  | CircleGeometry
  | PolygonGeometry
  | PolylineGeometry
  | LineGeometry
  | CuboidGeometry
  | Polygon3DGeometry
  | SphereGeometry;

// Annotation 类型定义
export interface Annotation {
  id: string;
  geometry: Geometry;
  userData?: Record<string, unknown>;
}

// 通用绘制策略接口，适用于所有标注形状
export interface DrawStrategy {
  /**
   * 指针按下事件（如鼠标/触摸）
   */
  onPointerDown(event: PointerEvent): void;
  /**
   * 指针移动事件
   */
  onPointerMove(event: PointerEvent): void;
  /**
   * 指针抬起事件，返回最终 Annotation 或 null（未完成）
   */
  onPointerUp(event: PointerEvent): Annotation | null;
  /**
   * 获取当前临时几何数据（用于实时渲染）
   */
  getCurrentGeometry(): Geometry | null;
  /**
   * 重置内部状态
   */
  reset(): void;
}
