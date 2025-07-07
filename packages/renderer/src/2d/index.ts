import Konva from "konva";

export function render2D(container: Konva.StageConfig["container"]) {
  const stage = new Konva.Stage({
    container,
    width: 500,
    height: 400,
  });
  const layer = new Konva.Layer();
  const rect = new Konva.Rect({
    x: 50,
    y: 50,
    width: 200,
    height: 100,
    fill: "skyblue",
    stroke: "black",
    strokeWidth: 2,
  });
  layer.add(rect);
  stage.add(layer);
}
