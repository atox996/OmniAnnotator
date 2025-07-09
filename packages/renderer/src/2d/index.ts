import {
  AnnotationController,
  AnnotationManager,
  RectStrategy,
} from "@omni-annotator/core";
import Konva from "konva";

export function render2D(container: Konva.StageConfig["container"]) {
  // 初始化核心对象
  const manager = new AnnotationManager();
  const controller = new AnnotationController(manager);
  controller.setStrategy(new RectStrategy());

  // 初始化 Konva 舞台和图层
  const stage = new Konva.Stage({
    container,
    width: 500,
    height: 400,
  });
  const layer = new Konva.Layer();
  stage.add(layer);

  // 临时形状
  let tempRect: Konva.Rect | null = null;

  // 事件绑定
  stage.on("mousedown", (e) => {
    controller.onPointerDown(e.evt as PointerEvent);
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

  stage.on("mousemove", (e) => {
    controller.onPointerMove(e.evt as PointerEvent);
    const geom = controller.getCurrentGeometry();
    if (geom && tempRect && geom.type === "rect") {
      tempRect.x(geom.x);
      tempRect.y(geom.y);
      tempRect.width(geom.width);
      tempRect.height(geom.height);
      // tempRect.visible(true);
      layer.batchDraw();
    }
  });

  stage.on("mouseup", (e) => {
    controller.onPointerUp(e.evt as PointerEvent);
    // 渲染所有标注
    layer.find("Rect").forEach((r) => r.destroy()); // 清空旧的
    manager.getAll().forEach((anno) => {
      if (anno.geometry.type === "rect") {
        const rect = new Konva.Rect({
          x: anno.geometry.x,
          y: anno.geometry.y,
          width: anno.geometry.width,
          height: anno.geometry.height,
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
      layer.batchDraw();
    }
  });
}
