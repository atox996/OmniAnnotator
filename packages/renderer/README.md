# @omni-annotator/renderer

统一的 2D/3D 渲染器，内部细分 2d/3d，专注于标注的可视化表现层。

## 目录结构

```text
src/
  index.ts         # 渲染器总入口
  2d/
    index.ts       # 2D 渲染器实现
    ...
  3d/
    index.ts       # 3D 渲染器实现
    ...
```

## 用法

只用 2D：

```ts
import { ... } from '@omni-annotator/renderer/2d';
```

只用 3D：

```ts
import { ... } from '@omni-annotator/renderer/3d';
```

## 依赖

- 2D 无特殊依赖
- 3D 推荐 peerDependencies/optionalDependencies 方式引入 three.js

## 说明

- 2D/3D 渲染器互不依赖，按需引入。
- 仅负责表现层，不涉及业务和插件。
