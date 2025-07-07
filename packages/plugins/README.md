# @omni-annotator/plugins

插件系统，既提供插件开发接口，也内置常用插件，支持用户自定义和官方扩展。

## 目录结构

```text
src/
  types.ts           # 插件接口/类型定义
  base.ts            # 插件基类（可选）
  index.ts           # 统一导出
  builtins/          # 内置插件目录
    measure2d/       # 2D 测距插件
      index.ts
      ...
    measure3d/       # 3D 测距插件
      index.ts
      ...
    comment/         # 标注评论插件
      index.ts
      ...
    undoRedo/        # 撤销重做插件
      index.ts
      ...
```

## 用法

### 使用内置插件

```ts
import { Measure2DPlugin } from "@omni-annotator/plugins/builtins/measure2d";
```

### 开发自定义插件

```ts
import type { IPlugin, PluginContext } from "@omni-annotator/plugins";

export class MyCustomPlugin implements IPlugin {
  name = "my-plugin";
  init(context: PluginContext) {
    // ...
  }
}
```

## 依赖

无强依赖。

## 说明

- 插件系统本身不依赖 core/engine，只定义接口和内置插件。
- 每个内置插件单独一个文件夹，便于后期扩展和维护。
- 用户可直接使用官方内置插件，也可基于接口自定义扩展。
