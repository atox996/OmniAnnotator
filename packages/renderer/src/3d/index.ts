import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  Vector3,
  WebGLRenderer,
} from "three";

export class Renderer {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  constructor(container: HTMLElement) {
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );

    this.renderer = new WebGLRenderer({ antialias: true });
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(this.renderer.domElement);

    const geometry = new BoxGeometry(1, 1, 1);

    const material = new MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });

    const cube = new Mesh(geometry, material);

    this.scene.add(cube);

    this.camera.position.set(2, 2, 2);
    this.camera.lookAt(new Vector3(0, 0, 0));

    this.render();
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }
}
