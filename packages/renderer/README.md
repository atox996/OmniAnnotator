# @omni-annotator/renderer

OmniAnnotator 项目的渲染器包，负责 2D/3D 标注的可视化渲染和交互。

## 功能特性

- **多渲染后端**：支持 Canvas 2D、WebGL、Three.js 等多种渲染后端
- **2D/3D 支持**：同时支持二维和三维标注的渲染
- **交互支持**：提供鼠标、触摸、键盘等交互事件处理
- **性能优化**：支持大规模标注的高性能渲染
- **可扩展性**：支持自定义渲染器和渲染策略

## 安装

```bash
pnpm add @omni-annotator/renderer
```

## 核心组件

### Renderer2D

2D 渲染器，支持 Canvas 2D 和 WebGL 后端。

```typescript
import { Renderer2D } from "@omni-annotator/renderer";
import type { Annotation, Point2D } from "@omni-annotator/types";

// 创建 2D 渲染器
const renderer = new Renderer2D({
  container: document.getElementById("canvas"),
  backend: "canvas2d", // 或 'webgl'
  width: 800,
  height: 600,
});

// 初始化
await renderer.init();

// 渲染标注
renderer.renderAnnotations(annotations);

// 设置视图变换
renderer.setViewTransform({
  scale: 1.5,
  translate: { x: 100, y: 100 },
});
```

### Renderer3D

3D 渲染器，基于 Three.js 实现。

```typescript
import { Renderer3D } from "@omni-annotator/renderer";
import type { Annotation, Point3D } from "@omni-annotator/types";

// 创建 3D 渲染器
const renderer = new Renderer3D({
  container: document.getElementById("canvas"),
  width: 800,
  height: 600,
  camera: {
    position: { x: 0, y: 0, z: 1000 },
    target: { x: 0, y: 0, z: 0 },
  },
});

// 初始化
await renderer.init();

// 渲染标注
renderer.renderAnnotations(annotations);

// 设置相机
renderer.setCamera({
  position: { x: 0, y: 0, z: 1000 },
  target: { x: 0, y: 0, z: 0 },
});
```

## 基本用法

### 2D 渲染

```typescript
import { Renderer2D } from "@omni-annotator/renderer";
import type { Annotation, BoundingBox2D } from "@omni-annotator/types";

// 创建渲染器
const renderer = new Renderer2D({
  container: document.getElementById("canvas"),
  backend: "canvas2d",
  width: 800,
  height: 600,
  backgroundColor: "#ffffff",
  grid: {
    enabled: true,
    size: 20,
    color: "#f0f0f0",
  },
});

// 初始化
await renderer.init();

// 渲染标注
const annotations: Annotation[] = [
  {
    id: "rect-1",
    type: "rectangle",
    bbox: { x: 100, y: 100, width: 200, height: 150 },
    label: "目标对象",
    color: "#ff0000",
    opacity: 0.8,
  },
];

renderer.renderAnnotations(annotations);

// 设置视图变换
renderer.setViewTransform({
  scale: 1.5,
  translate: { x: 100, y: 100 },
  rotation: 0,
});

// 获取鼠标位置
renderer.on("mousemove", (event) => {
  const worldPos = renderer.screenToWorld(event.x, event.y);
  console.log("鼠标世界坐标:", worldPos);
});
```

### 3D 渲染

```typescript
import { Renderer3D } from "@omni-annotator/renderer";
import type { Annotation, BoundingBox3D } from "@omni-annotator/types";

// 创建 3D 渲染器
const renderer = new Renderer3D({
  container: document.getElementById("canvas"),
  width: 800,
  height: 600,
  backgroundColor: "#000000",
  camera: {
    position: { x: 0, y: 0, z: 1000 },
    target: { x: 0, y: 0, z: 0 },
    fov: 60,
  },
  lights: [
    {
      type: "ambient",
      color: "#ffffff",
      intensity: 0.6,
    },
    {
      type: "directional",
      color: "#ffffff",
      intensity: 0.8,
      position: { x: 1, y: 1, z: 1 },
    },
  ],
});

// 初始化
await renderer.init();

// 渲染 3D 标注
const annotations: Annotation[] = [
  {
    id: "cuboid-1",
    type: "cuboid",
    bbox: { x: 0, y: 0, z: 0, width: 100, height: 100, depth: 100 },
    label: "3D 对象",
    color: "#00ff00",
    opacity: 0.8,
  },
];

renderer.renderAnnotations(annotations);

// 设置相机
renderer.setCamera({
  position: { x: 0, y: 0, z: 1000 },
  target: { x: 0, y: 0, z: 0 },
});

// 监听相机变化
renderer.on("camera:changed", (camera) => {
  console.log("相机已改变:", camera);
});
```

### 交互处理

```typescript
// 鼠标事件
renderer.on("mousedown", (event) => {
  console.log("鼠标按下:", event);
});

renderer.on("mousemove", (event) => {
  console.log("鼠标移动:", event);
});

renderer.on("mouseup", (event) => {
  console.log("鼠标释放:", event);
});

renderer.on("click", (event) => {
  const worldPos = renderer.screenToWorld(event.x, event.y);
  console.log("点击位置:", worldPos);
});

// 键盘事件
renderer.on("keydown", (event) => {
  console.log("按键按下:", event);
});

// 触摸事件
renderer.on("touchstart", (event) => {
  console.log("触摸开始:", event);
});

renderer.on("touchmove", (event) => {
  console.log("触摸移动:", event);
});

renderer.on("touchend", (event) => {
  console.log("触摸结束:", event);
});
```

### 视图控制

```typescript
// 缩放
renderer.zoom(1.5);
renderer.zoomTo(2.0);

// 平移
renderer.pan(100, 100);
renderer.panTo({ x: 200, y: 200 });

// 旋转（3D）
renderer.rotate(0, Math.PI / 4, 0);
renderer.rotateTo({ x: 0, y: Math.PI / 2, z: 0 });

// 重置视图
renderer.resetView();

// 适应视图
renderer.fitToView();

// 获取视图状态
const viewState = renderer.getViewState();
console.log("视图状态:", viewState);
```

## API 参考

### Renderer2D

2D 渲染器类。

#### 构造函数

```typescript
constructor(options: {
  container: HTMLElement;
  backend?: 'canvas2d' | 'webgl';
  width?: number;
  height?: number;
  backgroundColor?: string;
  grid?: GridOptions;
})
```

#### 生命周期方法

- `init(): Promise<void>` - 初始化渲染器
- `destroy(): Promise<void>` - 销毁渲染器
- `resize(width, height): void` - 调整大小

#### 渲染方法

- `renderAnnotations(annotations): void` - 渲染标注
- `clear(): void` - 清空画布
- `redraw(): void` - 重新绘制

#### 视图方法

- `setViewTransform(transform): void` - 设置视图变换
- `getViewTransform(): ViewTransform` - 获取视图变换
- `zoom(factor): void` - 缩放
- `pan(x, y): void` - 平移
- `resetView(): void` - 重置视图
- `fitToView(): void` - 适应视图

#### 坐标转换

- `screenToWorld(x, y): Point2D` - 屏幕坐标转世界坐标
- `worldToScreen(x, y): Point2D` - 世界坐标转屏幕坐标

#### 事件方法

- `on(event, handler): void` - 监听事件
- `off(event, handler): void` - 移除事件监听

### Renderer3D

3D 渲染器类。

#### 构造函数

```typescript
constructor(options: {
  container: HTMLElement;
  width?: number;
  height?: number;
  backgroundColor?: string;
  camera?: CameraOptions;
  lights?: LightOptions[];
})
```

#### 生命周期方法

- `init(): Promise<void>` - 初始化渲染器
- `destroy(): Promise<void>` - 销毁渲染器
- `resize(width, height): void` - 调整大小

#### 渲染方法

- `renderAnnotations(annotations): void` - 渲染标注
- `clear(): void` - 清空场景
- `render(): void` - 渲染场景

#### 相机方法

- `setCamera(options): void` - 设置相机
- `getCamera(): Camera` - 获取相机
- `orbit(target, radius, phi, theta): void` - 轨道相机
- `flyTo(position, target): void` - 飞向位置

#### 视图方法

- `zoom(factor): void` - 缩放
- `pan(x, y, z): void` - 平移
- `rotate(x, y, z): void` - 旋转
- `resetView(): void` - 重置视图
- `fitToView(): void` - 适应视图

#### 坐标转换

- `screenToWorld(x, y): Point3D` - 屏幕坐标转世界坐标
- `worldToScreen(x, y, z): Point2D` - 世界坐标转屏幕坐标

## 设计原则

### 多后端支持

- 支持多种渲染后端，适应不同性能需求
- 统一的 API 接口，便于切换后端
- 后端特定的优化和特性

### 性能优化

- 支持大规模标注的高性能渲染
- 视图裁剪和 LOD 优化
- 异步渲染和增量更新

### 交互友好

- 完整的鼠标、触摸、键盘交互支持
- 直观的视图控制操作
- 流畅的动画和过渡效果

### 可扩展性

- 支持自定义渲染器和渲染策略
- 插件化的渲染组件
- 灵活的材质和着色器系统

## 依赖说明

- **@omni-annotator/types**: 类型定义
- **@omni-annotator/utils**: 工具函数和事件系统
- **three**: 3D 渲染库（可选）
- **lodash-es**: 工具函数（根目录依赖）

## 使用场景

- **标注可视化**：渲染各种类型的标注
- **交互编辑**：支持标注的交互式编辑
- **视图控制**：提供缩放、平移、旋转等视图操作
- **性能优化**：大规模标注的高性能渲染

## 开发

```bash
# 类型检查
pnpm tscheck

# 构建
pnpm build
```

## 说明

- 专注于渲染和可视化，不涉及业务逻辑
- 支持多种渲染后端，适应不同需求
- 完整的交互支持和视图控制
- 高性能渲染和优化
- 可扩展的渲染架构
