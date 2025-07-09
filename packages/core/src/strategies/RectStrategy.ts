import type { Annotation, DrawStrategy, RectGeometry } from "../types";

// 矩形绘制策略：支持鼠标拖拽绘制矩形
export default class RectStrategy implements DrawStrategy {
  private start: { x: number; y: number } | null = null;
  private current: { x: number; y: number } | null = null;
  private drawing = false;

  onPointerDown(event: PointerEvent): void {
    this.start = { x: event.offsetX, y: event.offsetY };
    this.current = { x: event.offsetX, y: event.offsetY };
    this.drawing = true;
  }

  onPointerMove(event: PointerEvent): void {
    if (!this.drawing || !this.start) return;
    this.current = { x: event.offsetX, y: event.offsetY };
  }

  onPointerUp(_event: PointerEvent): Annotation | null {
    if (!this.drawing || !this.start || !this.current) return null;
    const rect = this._getRectGeometry();
    this.reset();
    if (!rect) return null;
    return {
      id: this._generateId(),
      geometry: rect,
    };
  }

  getCurrentGeometry(): RectGeometry | null {
    if (!this.drawing || !this.start || !this.current) return null;
    return this._getRectGeometry();
  }

  reset(): void {
    this.start = null;
    this.current = null;
    this.drawing = false;
  }

  // 计算当前矩形几何
  private _getRectGeometry(): RectGeometry | null {
    if (!this.start || !this.current) return null;
    const x = Math.min(this.start.x, this.current.x);
    const y = Math.min(this.start.y, this.current.y);
    const width = Math.abs(this.current.x - this.start.x);
    const height = Math.abs(this.current.y - this.start.y);
    if (width < 1 || height < 1) return null; // 忽略过小矩形
    return {
      type: "rect",
      x,
      y,
      width,
      height,
    };
  }

  // 简单生成唯一 id（可替换为更复杂方案）
  private _generateId(): string {
    return `rect_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  }
}
