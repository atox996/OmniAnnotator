import { EventEmitter } from "eventemitter3";
import { debounce } from "lodash-es";
import { Camera, WebGLRenderer } from "three";

interface EventTypes {
  renderBefore(): void;
  renderAfter(): void;
  resize(): void;
}

export default abstract class Viewer<
  T extends EventEmitter.ValidEventTypes = EventEmitter.ValidEventTypes,
> extends EventEmitter<T | EventTypes> {
  container: HTMLElement;
  renderer: WebGLRenderer;

  get width() {
    return this.container.clientWidth || 1;
  }

  get height() {
    return this.container.clientHeight || 1;
  }

  get aspect() {
    return this.width / this.height;
  }

  abstract camera: Camera;

  private _resizeObserver: ResizeObserver;
  private _renderTimer = 0;
  constructor(container: HTMLElement) {
    super();

    this.container = container;

    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.autoClear = false;
    this.renderer.sortObjects = false;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
    container.appendChild(this.renderer.domElement);

    this._resizeObserver = new ResizeObserver(
      debounce(() => {
        this.resize();
      }, 100),
    );
    this._resizeObserver.observe(container);
  }

  resize() {
    this.renderer.setSize(this.width, this.height);
    this.emit("resize");
    this.render();
  }

  render() {
    if (this._renderTimer) return;
    this._renderTimer = requestAnimationFrame(() => {
      this.emit("renderBefore");
      this.renderer.clear();
      this.renderFrame();
      this.emit("renderAfter");
      this._renderTimer = 0;
    });
  }

  destroy() {
    cancelAnimationFrame(this._renderTimer);
    this._renderTimer = 0;
    this.renderer.dispose();
    this.renderer.domElement.remove();
    this._resizeObserver.disconnect();
  }

  abstract renderFrame(): void;
}
