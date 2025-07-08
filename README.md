# OmniAnnotator

一个现代化的 2D/3D 标注工具框架，采用模块化设计，支持多种标注类型和渲染方式。

## 项目特性

- **模块化架构**：采用 Monorepo 结构，各模块职责清晰，便于维护和扩展
- **类型安全**：完整的 TypeScript 类型支持，提供优秀的开发体验
- **事件驱动**：基于 mitt 的事件系统，支持松耦合的组件通信
- **2D/3D 支持**：同时支持二维和三维标注，满足不同场景需求
- **可扩展性**：插件化设计，支持功能扩展和自定义

## 项目结构

```text
OmniAnnotator/
├── packages/
│   ├── utils/          # 工具函数包
│   ├── core/           # 核心业务逻辑包
│   ├── engine/         # 标注器引擎（粘合各模块）
│   ├── renderer/       # 渲染器包（2D/3D 渲染）
│   └── plugins/        # 插件系统包 (标注插件/测距插件/标注评论/撤回重做)
├── examples/           # 示例和 demo
├── scripts/            # 构建和开发脚本
└── README.md           # 项目说明
```

## 子包说明

### @omni-annotator/utils

**工具函数和事件系统包**

### @omni-annotator/core

**核心业务逻辑包**

- 标注数据管理和业务规则
- 项目生命周期管理
- 事件驱动的标注状态管理
- 标注工厂，支持多种标注类型创建

### @omni-annotator/engine

**标注器引擎包**

- 协调 core、renderer、plugins 等模块
- 实现标注流程的主控逻辑
- 提供统一的标注器 API

### @omni-annotator/renderer

**渲染器包**

- 2D/3D 渲染实现
- 支持多种渲染后端（Canvas、WebGL、Three.js 等）

### @omni-annotator/plugins

**插件系统包**

- 插件化架构，支持功能扩展
- 标注、测距、评论、撤回、导出等插件
- 插件生命周期管理

## 快速开始

### 安装

```bash
# 克隆项目
git clone https://github.com/atox996/OmniAnnotator.git
cd OmniAnnotator

# 安装依赖
pnpm install
```

## 开发

### 开发环境

```bash
# 安装依赖
pnpm install

# 开发模式
pnpm dev

# 构建所有包
pnpm build

# 代码检查
pnpm lint
```

### 子包开发

```bash
# 构建特定子包
pnpm --filter @omni-annotator/core build

# 开发特定子包
pnpm --filter @omni-annotator/core dev
```

## 架构设计

### 设计原则

- **职责分离**：每个包专注于特定功能，避免职责混乱
- **依赖最小化**：包间依赖关系清晰，避免循环依赖
- **类型安全**：完整的 TypeScript 类型支持
- **事件驱动**：通过事件系统实现松耦合通信
- **可扩展性**：插件化设计，支持功能扩展

## 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 支持

如果你有任何问题或建议，请：

- 提交 [Issue](https://github.com/atox996/OmniAnnotator/issues)
- 查看 [文档](https://github.com/atox996/OmniAnnotator/docs)
- 加入 [讨论](https://github.com/atox996/OmniAnnotator/discussions)
