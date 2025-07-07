# @omni-annotator/engine

标注器引擎，负责粘合 core、renderer、plugins 等模块，协调各部分协同工作，实现标注流程的主控。

## 目录结构

```text
src/
  index.ts         # 引擎主入口
  ...              # 其他引擎实现
```

## 用法

```ts
import { ... } from '@omni-annotator/engine';
```

## 依赖

依赖 core、renderer、plugins。

## 说明

- 负责 orchestrate 各核心模块，调度插件和渲染。
- 可根据业务需求灵活扩展。
