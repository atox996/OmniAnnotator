import { Renderer } from "../../packages/renderer/src/2d";

const app = document.getElementById("app");
if (app) {
  const renderer = new Renderer(app, {
    hello: true, // debug
  });
  console.log(renderer);
}
