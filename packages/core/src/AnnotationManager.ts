import { EventEmitter } from "eventemitter3";

import type { Annotation } from "./types";

interface EventTypes {
  add(annos: Annotation[]): this;
  remove(annos: Annotation[]): this;
  update(annos: Annotation[]): this;
  select(annos: Annotation[]): this;
  unselect(annos: Annotation[]): this;
  clear(): this;
}

export class AnnotationManager extends EventEmitter<EventTypes> {
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
      .map((id) => this.annotations.get(id))
      .filter((ann): ann is Annotation => !!ann);
  }

  getAll(): Annotation[] {
    return Array.from(this.annotations.values());
  }

  select(ids: string[]): Annotation[] {
    const selected: Annotation[] = ids
      .filter((id) => this.annotations.has(id))
      .map((id) => this.annotations.get(id)!);
    if (selected.length) this.emit("select", selected);
    return selected;
  }

  unselect(ids: string[]): Annotation[] {
    const unselected: Annotation[] = ids
      .filter((id) => this.annotations.has(id))
      .map((id) => this.annotations.get(id)!);
    if (unselected.length) this.emit("unselect", unselected);
    return unselected;
  }

  clear(): this {
    this.annotations.clear();
    this.emit("clear");
    return this;
  }
}
