import { vec2 } from "gl-matrix";

import { BaseShape } from "../BaseShape";
import type { RectShapeData } from "./types";
import { getRectShapeData } from "./utils";

export default class ClickRectShape extends BaseShape<RectShapeData> {
  readonly type = "rect";
  private _start = vec2.create();
  private _current = vec2.create();
  private _drawing = false;

  private _onClick = (event: MouseEvent): void => {
    if (event.button !== 0) return;
    if (!this._drawing) {
      vec2.set(this._start, event.offsetX, event.offsetY);
      vec2.copy(this._current, this._start);
      this._drawing = true;
      this.emit("start");
    } else {
      vec2.set(this._current, event.offsetX, event.offsetY);
      if (!vec2.equals(this._start, this._current)) {
        this.emit("end");
      } else {
        this.emit("cancel");
      }
      this.reset();
    }
  };

  private _onMouseMove = (event: MouseEvent): void => {
    if (!this._drawing) return;
    vec2.set(this._current, event.offsetX, event.offsetY);
    this.emit("update");
  };

  private _onContextMenu = (event: MouseEvent): void => {
    event.preventDefault();
  };

  getShape(): RectShapeData {
    return getRectShapeData(this._start, this._current);
  }

  reset(): void {
    this._drawing = false;
    vec2.zero(this._start);
    vec2.zero(this._current);
    this.emit("reset");
  }

  init(): void {
    this.container.addEventListener("click", this._onClick);
    this.container.addEventListener("mousemove", this._onMouseMove);
    this.container.addEventListener("contextmenu", this._onContextMenu);
    this.emit("init");
  }

  destroy(): void {
    this.container.removeEventListener("click", this._onClick);
    this.container.removeEventListener("mousemove", this._onMouseMove);
    this.container.removeEventListener("contextmenu", this._onContextMenu);
    this.emit("destroy");
  }
}
