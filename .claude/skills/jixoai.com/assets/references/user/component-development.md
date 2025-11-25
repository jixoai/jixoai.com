---
title: 组件开发规范
---

## jixoai.com 组件开发规范

### 组件分类
1. **UI 组件** (`src/components/ui/`): ShadcnUI 标准组件
2. **MagicUI 组件** (`src/components/magicui/`): 动画效果组件
3. **业务组件** (`src/components/`): 项目特定组件

### ShadcnUI 组件
使用 shadcn/ui CLI 添加新组件:
```bash
pnpm dlx shadcn@latest add <component-name>
```

### 样式规范
- 使用 Tailwind CSS v4 (CSS-first 配置)
- 使用 `@container` 容器查询做响应式
- 使用 `grid` 布局构建页面结构
- 配合 `cn()` 工具函数合并类名

### 类型安全
- 所有组件使用 TypeScript
- 使用 Zod 验证 props (如需要)
- 避免使用 `any` 类型
