import { Scene } from "./types/scene";

export class SceneManager {
  private scene: Scene;

  constructor(scene: Scene) {
    this.scene = scene;
  }

  getScene() {
    return this.scene;
  }

  // 初始化场景
  init() {
    // ...初始化逻辑...
  }
}
