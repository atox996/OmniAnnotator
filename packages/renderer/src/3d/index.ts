import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";

export function render3D(container: HTMLElement) {
  const scene = new Scene();
  const camera = new PerspectiveCamera(75, 500 / 400, 0.1, 1000);
  const renderer = new WebGLRenderer();
  renderer.setSize(500, 400);
  container.appendChild(renderer.domElement);

  const geometry = new BoxGeometry();
  const material = new MeshBasicMaterial({ color: 0x00aaff, wireframe: true });
  const cube = new Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 3;

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
}
