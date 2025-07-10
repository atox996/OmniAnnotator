import type { AnnotationManager } from "./AnnotationManager";
import type { BaseAnnotation } from "./annotations/BaseAnnotation";

export class AnnotationController<A extends BaseAnnotation, T = A["type"]> {
  private manager: AnnotationManager;
  private annotations = new Map<T, A>();
  private annotate?: A;

  constructor(manager: AnnotationManager, strategies: A[]) {
    this.manager = manager;
    strategies.forEach((annotate) => {
      this.annotations.set(annotate.type as T, annotate);
    });
  }

  enable(type: T) {
    if (type === this.annotate?.type) return;
    this.disable();
    this.annotate = this.annotations.get(type);
    this.annotate?.init();
  }

  disable() {
    this.annotate?.destroy();
    this.annotate = undefined;
  }

  reset() {
    this.annotate?.reset();
  }

  dispose() {
    this.manager.clear();
    this.annotations.forEach((annotate) => annotate.destroy());
    this.annotations.clear();
    this.annotate = undefined;
  }
}
