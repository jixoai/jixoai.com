---
title: 国际化系统
---

## jixoai.com 国际化系统

### 支持的语言
| 代码 | 语言 |
|------|------|
| en | English |
| zh-CN | 简体中文 |
| zh-TW | 繁體中文 |
| ru | Русский |
| fr | Francais |
| es | Espanol |
| de | Deutsch |
| ja | 日本語 |
| ko | 한국어 |

### 翻译流程
1. 在 `src/content/blog/` 创建源文件 (如 `post.md`)
2. 运行 `pnpm run translate`
3. 系统自动生成各语言版本 (如 `post.en.md`, `post.ja.md`)

### 翻译规则
翻译规则定义在 `i18n-rules.md`，包括：
- 术语保留规则（如品牌名称不翻译）
- 格式保持规则
- 特殊处理指令

### 缓存机制
翻译结果会被缓存，相同内容不会重复翻译。
缓存位置：`scripts/translate/` 相关文件管理

### 环境变量
- `DEEPSEEK_API_KEY`: DeepSeek API 密钥 (必需)
