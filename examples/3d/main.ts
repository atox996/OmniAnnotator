import { Renderer } from "../../packages/renderer/src/3d";

const app = document.getElementById("app");
if (app) {
  const renderer = new Renderer(app);
  console.log(renderer);
}
