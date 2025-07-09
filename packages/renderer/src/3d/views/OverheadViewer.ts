import OrthographicViewer from "./OrthographicViewer";

export default class OverheadViewer extends OrthographicViewer {
  override renderFrame(): void {
    throw new Error("Method not implemented.");
  }
}
