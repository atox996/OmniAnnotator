import { Viewer } from "../../packages/viewer/src/2d";

const app = document.getElementById("app");
if (app) {
  const viewer = new Viewer(app, {
    hello: true, // debug
  });
  console.log(viewer);
}
