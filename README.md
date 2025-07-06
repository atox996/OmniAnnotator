omniannotator/
├── packages/
│ ├── core/ # 核心基础设施
│ │ ├── src/
│ │ │ ├── scene/ # 中央场景管理
│ │ │ │ ├── SceneManager.ts
│ │ │ │ └── LayerSystem.ts
│ │ │ ├── cameras/ # 相机系统
│ │ │ │ ├── PerspectiveCamera.ts
│ │ │ │ ├── OrthoCamera.ts
│ │ │ │ └── KittiCamera.ts
│ │ │ ├── utils/
│ │ │ │ ├── coordTransformer.ts
│ │ │ │ └── calibParser.ts
│ │ │ └── types/ # 通用类型定义（供内部模块使用）
│ │ │ ├── scene.ts
│ │ │ ├── camera.ts
│ │ │ └── index.ts
│ │ └── package.json

│ ├── pointcloud/ # 点云模块
│ │ ├── src/
│ │ │ ├── PointCloudRenderer.ts
│ │ │ └── PointCloudProcessor.ts
│ │ └── package.json

│ ├── annotation/ # 标注模块
│ │ ├── src/
│ │ │ ├── renderers/
│ │ │ │ ├── Box3DRenderer.ts # 3D标注框渲染（InstancedMesh）
│ │ │ │ └── Box2DOverlayRenderer.ts # 2D标注渲染入口
│ │ │ ├── controller/
│ │ │ │ ├── BoxAnnotationController.ts # 控制标注逻辑
│ │ │ │ └── CanvasAnnotationController.ts # 抽象 Canvas 引擎控制器（支持 Konva/Pixi/Canvas）
│ │ │ ├── engine/ # 可替换 Canvas 引擎封装层
│ │ │ │ ├── KonvaEngine.ts
│ │ │ │ ├── PixiEngine.ts
│ │ │ │ └── NativeCanvasEngine.ts
│ │ │ ├── selector/ # 选中逻辑
│ │ │ │ └── BoxSelector.ts
│ │ │ └── types/
│ │ │ └── annotation.ts
│ │ └── package.json

│ ├── plugin/ # 插件与扩展模块
│ │ ├── src/
│ │ │ ├── measure/ # 测量工具插件
│ │ │ │ └── RulerPlugin.ts
│ │ │ ├── comment/ # 标注评论系统
│ │ │ │ └── CommentPlugin.ts
│ │ │ ├── versioning/ # 标注版本控制
│ │ │ │ └── HistoryPlugin.ts
│ │ │ └── types.ts # 插件接口定义
│ │ └── package.json

│ ├── kitti/ # KITTI专项支持
│ │ ├── src/
│ │ │ ├── KittiLoader.ts
│ │ │ └── KittiExporter.ts
│ │ └── package.json

│ └── view/ # 视图系统封装（从 example 独立出来）
│ ├── src/
│ │ ├── PerspectiveView.ts
│ │ ├── OrthoViews.ts
│ │ └── ViewSyncManager.ts
│ └── package.json

├── examples/
│ ├── pointcloud-only/
│ │ ├── src/
│ │ │ └── main.ts
│ │ └── vite.config.ts
│
│ ├── kitti-multiview/
│ │ ├── src/
│ │ │ ├── main.ts
│ │ │ └── views.ts
│ │ └── index.html
│
│ └── image-annotation/
│ ├── src/
│ │ └── canvasSetup.ts # Canvas 初始化，Konva/Pixi 可替换
│ └── index.html

├── configs/
│ ├── tsconfig.base.json
│ └── vite/
│ ├── library.ts
│ └── app.ts

├── docs/ # 技术文档（选填）
│ ├── architecture.md # 架构图说明
│ └── plugin-system.md # 插件机制规范说明

├── package.json
└── pnpm-workspace.yaml
