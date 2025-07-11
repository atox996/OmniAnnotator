import { Application, type ApplicationOptions } from "pixi.js";

export class Renderer {
  container: HTMLElement;

  private app: Application | null = null;

  private _initPromise: Promise<void> | null = null;

  constructor(
    container: HTMLElement,
    options: Partial<ApplicationOptions> = {},
  ) {
    this.container = container;
    this.init(options);
  }

  async init(options: Partial<ApplicationOptions> = {}) {
    if (this._initPromise) return this._initPromise;
    try {
      this.app = new Application();
      this._initPromise = this.app.init({
        backgroundColor: "transparent",
        antialias: true,
        autoDensity: true,
        resizeTo: this.container,
        ...options,
      });
      await this._initPromise;
      if (!options.canvas) this.container.appendChild(this.app.canvas);
    } catch (error) {
      this._initPromise = null;
      throw error;
    }
  }

  clear() {
    // 只清理children, 保留纹理后续复用
    this.app?.stage.destroy({ children: true });
  }

  render() {
    this.app?.render();
  }

  async destroy() {
    await this._initPromise?.catch();
    this._initPromise = null;
    this.app?.destroy(true, true);
    this.app = null;
  }
}
