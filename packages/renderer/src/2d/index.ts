import { AnnotationManager, ClickRectAnnotation } from "@omni-annotator/core";
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

  // 初始化核心对象
  const manager = new AnnotationManager();
  const rectStrategy = new ClickRectAnnotation(stage.content);
  rectStrategy.init();
  // 临时形状
  let tempRect: Konva.Rect | null = null;
  rectStrategy.on("start", () => {
    if (!tempRect) {
      tempRect = new Konva.Rect({
        fill: "rgba(135,206,235,0.3)",
        stroke: "skyblue",
        strokeWidth: 2,
        listening: false,
      });
      layer.add(tempRect);
    }
  });
  rectStrategy.on("update", () => {
    const geometry = rectStrategy.getGeometry();
    if (tempRect) {
      tempRect.setAttrs(geometry);
      layer.batchDraw();
    }
  });
  rectStrategy.on("end", () => {
    manager.add([
      {
        id: crypto.randomUUID(),
        ...rectStrategy.getGeometry(),
      },
    ]);
    layer.find("Rect").forEach((r) => r.destroy()); // 清空旧的
    manager.getAll().forEach((anno) => {
      if (anno.type === "rect") {
        const rect = new Konva.Rect({
          x: anno.x,
          y: anno.y,
          width: anno.width,
          height: anno.height,
          fill: "rgba(135,206,235,0.3)",
          stroke: "black",
          strokeWidth: 2,
          listening: false,
        });
        layer.add(rect);
      }
    });
    if (tempRect) {
      tempRect = null;
      // tempRect.visible(false);
    }
    layer.batchDraw();
  });
}
