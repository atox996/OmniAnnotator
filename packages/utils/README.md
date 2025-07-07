# @omni-annotator/utils

通用工具库，提供各类工具函数，供各子包复用。

## 目录结构

```text
src/
  index.ts         # 工具函数主入口
  ...              # 其他工具实现
```

## 用法

```ts
import { ... } from '@omni-annotator/utils';
```

## 依赖

无特殊依赖。

## 说明

- 仅包含通用工具函数，不涉及业务和渲染。
- 可被任意子包复用。
