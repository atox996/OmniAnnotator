import PerspectiveViewer from "./PerspectiveViewer";

export default class ImageViewer extends PerspectiveViewer {
  override renderFrame(): void {
    throw new Error("Method not implemented.");
  }
}
