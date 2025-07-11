import { OrthographicCamera } from "three";

import Viewer from "./Viewer";

export default class OrthographicViewer extends Viewer {
  camera: OrthographicCamera;
  constructor(container: HTMLElement) {
    super(container);

    this.camera = new OrthographicCamera();
  }

  resize(): void {
    super.resize();
  }

  renderFrame(): void {
    throw new Error("Method not implemented.");
  }
}
