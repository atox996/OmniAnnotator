import Konva from "konva";

export function render2D(container: Konva.StageConfig["container"]) {
  // 初始化 Konva 舞台和图层
  const stage = new Konva.Stage({
    container,
    width: 500,
    height: 400,
  });
  const layer = new Konva.Layer();
  stage.add(layer);
}
