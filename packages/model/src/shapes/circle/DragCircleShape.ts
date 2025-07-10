import { vec2 } from "gl-matrix";

import { BaseShape } from "../BaseShape";
import type { CircleShapeData } from "./types";
import { getCircleShapeData } from "./utils";

export default class DragCircleShape extends BaseShape<CircleShapeData> {
  readonly type = "circle";
  private _start = vec2.create();
  private _current = vec2.create();
  private _drawing = false;

  private _onPointerDown = (event: PointerEvent): void => {
    if (event.button !== 0) return;
    vec2.set(this._start, event.offsetX, event.offsetY);
    vec2.copy(this._current, this._start);
    this._drawing = true;
    this.emit("start");
  };

  private _onPointerMove = (event: PointerEvent): void => {
    if (!this._drawing) return;
    vec2.set(this._current, event.offsetX, event.offsetY);
    this.emit("update");
  };

  private _onPointerUp = (_event: PointerEvent): void => {
    if (!this._drawing) return;
    if (!vec2.equals(this._start, this._current)) {
      this.emit("end");
    } else {
      this.emit("cancel");
    }
    this.reset();
  };

  private _onPointerCancel = (_event: PointerEvent): void => {
    if (!this._drawing) return;
    this.emit("cancel");
    this.reset();
  };

  private _onContextMenu = (event: MouseEvent): void => {
    event.preventDefault();
  };

  getShape(): CircleShapeData {
    return getCircleShapeData(this._start, this._current);
  }

  reset(): void {
    vec2.zero(this._start);
    vec2.zero(this._current);
    this._drawing = false;
    this.emit("reset");
  }

  init(): void {
    this.container.addEventListener("pointerdown", this._onPointerDown);
    this.container.addEventListener("pointermove", this._onPointerMove);
    this.container.addEventListener("pointerup", this._onPointerUp);
    this.container.addEventListener("pointercancel", this._onPointerCancel);
    this.container.addEventListener("contextmenu", this._onContextMenu);
    this.emit("init");
  }

  destroy(): void {
    this.container.removeEventListener("pointerdown", this._onPointerDown);
    this.container.removeEventListener("pointermove", this._onPointerMove);
    this.container.removeEventListener("pointerup", this._onPointerUp);
    this.container.removeEventListener("pointercancel", this._onPointerCancel);
    this.container.removeEventListener("contextmenu", this._onContextMenu);
    this.emit("destroy");
  }
}
