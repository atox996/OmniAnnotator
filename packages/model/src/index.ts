import { EventEmitter } from "eventemitter3";

import type { ShapeData } from "./shapes";

type Annotation = ShapeData & {
  id: string;
  userData?: Record<string, unknown>;
};

interface EventTypes {
  add(annos: Annotation[]): this;
  remove(annos: Annotation[]): this;
  update(annos: Annotation[]): this;
  clear(): this;
}

export class AnnotationModel extends EventEmitter<EventTypes> {
  private annotations = new Map<string, Annotation>();

  add(annotations: Annotation[]): this {
    annotations.forEach((annotation) => {
      this.annotations.set(annotation.id, annotation);
    });
    if (annotations.length) this.emit("add", annotations);
    return this;
  }

  remove(ids: string[]): this {
    const removed: Annotation[] = [];
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

  update(ids: string[], patch: Partial<Annotation>): this {
    const updated: Annotation[] = [];
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

  get(ids: string[]): Annotation[] {
    return ids
      .filter((id) => this.annotations.has(id))
      .map((id) => this.annotations.get(id)!);
  }

  getAll(): Annotation[] {
    return Array.from(this.annotations.values());
  }

  clear(): this {
    this.annotations.clear();
    this.emit("clear");
    return this;
  }
}

export * from "./shapes";
