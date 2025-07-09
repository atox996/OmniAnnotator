import { EventEmitter } from "eventemitter3";

import type { AnnotationAny } from "../types";

interface EventTypes {
  add(annos: AnnotationAny[]): this;
  remove(annos: AnnotationAny[]): this;
  update(annos: AnnotationAny[]): this;
  select(annos: AnnotationAny[]): this;
  deselect(annos: AnnotationAny[]): this;
  clear(): this;
}

export class AnnotationManager extends EventEmitter<EventTypes> {
  private annotations = new Map<string, AnnotationAny>();

  add(annotations: AnnotationAny[]): this {
    annotations.forEach((annotation) => {
      this.annotations.set(annotation.id, annotation);
    });
    if (annotations.length) this.emit("add", annotations);
    return this;
  }

  remove(ids: string[]): this {
    const removed: AnnotationAny[] = [];
    ids.forEach((id) => {
      const ann = this.annotations.get(id);
      if (ann) {
        this.annotations.delete(id);
        removed.push(ann);
      }
    });
    if (removed.length) this.emit("remove", removed);
    return this;
  }

  update(ids: string[], patch: Partial<AnnotationAny>): this {
    const updated: AnnotationAny[] = [];
    ids.forEach((id) => {
      const ann = this.annotations.get(id);
      if (ann) {
        Object.assign(ann, patch);
        updated.push(ann);
      }
    });
    if (updated.length) this.emit("update", updated);
    return this;
  }

  select(ids: string[]): AnnotationAny[] {
    const selected: AnnotationAny[] = ids
      .map((id) => this.annotations.get(id))
      .filter((ann): ann is AnnotationAny => !!ann);
    if (selected.length) this.emit("select", selected);
    return selected;
  }

  deselect(ids: string[]): AnnotationAny[] {
    const deselected: AnnotationAny[] = ids
      .map((id) => this.annotations.get(id))
      .filter((ann): ann is AnnotationAny => !!ann);
    if (deselected.length) this.emit("deselect", deselected);
    return deselected;
  }

  get(ids: string[]): AnnotationAny[] {
    return ids
      .map((id) => this.annotations.get(id))
      .filter((ann): ann is AnnotationAny => !!ann);
  }

  getAll(): AnnotationAny[] {
    return Array.from(this.annotations.values());
  }

  clear(): this {
    this.annotations.clear();
    this.emit("clear");
    return this;
  }
}
