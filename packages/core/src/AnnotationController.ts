import type { AnnotationManager } from "./AnnotationManager";
import type { DrawStrategy, Geometry } from "./types";

export class AnnotationController {
  private strategy: DrawStrategy | null = null;
  private manager: AnnotationManager;

  constructor(manager: AnnotationManager) {
    this.manager = manager;
  }

  // 动态设置/切换策略
  setStrategy(strategy: DrawStrategy) {
    strategy.reset();
    this.strategy?.reset();
    this.strategy = strategy;
  }

  onPointerDown(event: PointerEvent) {
    this.strategy?.onPointerDown(event);
  }
  onPointerMove(event: PointerEvent) {
    this.strategy?.onPointerMove(event);
  }
  onPointerUp(event: PointerEvent) {
    const anno = this.strategy?.onPointerUp(event);
    if (anno) {
      this.manager.add([anno]);
    }
  }

  getCurrentGeometry(): Geometry | null {
    return this.strategy?.getCurrentGeometry() ?? null;
  }

  reset() {
    this.strategy?.reset();
  }
}
