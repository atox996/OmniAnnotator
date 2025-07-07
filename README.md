# OmniAnnotator 项目结构与子包功能说明

本项目采用分层、模块化的 Monorepo 结构，核心功能、渲染器、插件、工具等均以独立包形式组织，便于扩展和维护。

## 目录结构

```text
OmniAnnotator/
├── packages/
│   ├── core/           # 标注核心逻辑
│   ├── engine/         # 标注器引擎（粘合 core、renderer、plugins）
│   ├── plugins/        # 插件系统
│   ├── renderer/       # 渲染器
│   └── utils/          # 通用工具库
├── examples/           # 示例和 demo
├── .pnpm-workspace.yaml# pnpm 工作区配置
├── package.json        # 根项目依赖与脚本
└── README.md           # 项目说明
```

## 主要子包功能

- **@omni-annotator/core**  
  标注核心逻辑，负责标注数据结构、业务规则等，是整个系统的数据和业务基础。

- **@omni-annotator/engine**  
  标注器引擎，负责"粘合" core、renderer、plugins 等模块，协调各部分协同工作，实现标注流程的主控。

- **@omni-annotator/plugins**  
  插件系统，扩展标注器功能。可包含测量、评论等插件，便于功能灵活扩展。

- **@omni-annotator/renderer**  
  2D/3D 渲染器，支持二维/三维标注和多视图渲染，仅负责可视化展示。

- **@omni-annotator/utils**  
  通用工具库，提供各类工具函数，供各子包复用。

## 其他目录说明

- **examples/**  
  示例和 demo，展示各类标注和渲染功能的实际用法。

---

如需详细了解具体模块的设计和用法，请查阅对应子包的 README 或 docs 目录下的文档。

---
