import { PerspectiveCamera } from "three";

import Viewer from "./Viewer";

export default class PerspectiveViewer extends Viewer {
  camera: PerspectiveCamera;

  constructor(container: HTMLElement) {
    super(container);

    this.camera = new PerspectiveCamera();
    this.camera.aspect = this.aspect;
  }

  resize(): void {
    this.camera.aspect = this.aspect;
    this.camera.updateProjectionMatrix();
    super.resize();
  }

  renderFrame(): void {
    throw new Error("Method not implemented.");
  }
}
