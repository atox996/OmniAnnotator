import { Viewer } from "../../packages/viewer/src/3d";

const app = document.getElementById("app");
if (app) {
  const viewer = new Viewer(app);
  console.log(viewer);
}
