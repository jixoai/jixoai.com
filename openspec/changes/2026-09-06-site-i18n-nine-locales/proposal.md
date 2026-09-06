> Orthogonal intents (maintained 2026-09-06 Asia/Shanghai): hub i18n (9
> locales incl. RTL Arabic); repo README pair.
>
> Original request (2026-09-06 Asia/Shanghai): 官网 jixoai.com 支持语言应该
> 最多：中英西法德俄日韩阿 9 种，其他至少中英。

## Why

The hub ships English-only; as the organization front door it must speak
the family's full language set, including RTL Arabic.

## What Changes

### Locale surface (9)

- Locales: `en` (root — stable URLs, canonical), `zh`, `es`, `fr`, `de`,
  `ru`, `ja`, `ko`, `ar` at `/[lang]/`. Every public route mirrors:
  home, `/projects/`, `/projects/[repo]/`, `/blog/`, `/blog/[slug]/`.
- `<html lang>` per locale; `dir="rtl"` for `ar`; hreflang alternates
  (9 + x-default → root) on every page; the registry
  `language-switcher` (add + lock) offers all 9 in the header.
- Blog posts render under every locale with their authored language
  (frontmatter `lang`); indexes list all posts.

### Localization tiers (documented, no silent mixing)

1. UI chrome + marketing copy (hero/mission/section headings/labels/
   footer): fully localized in all 9.
2. Curated project descriptions: `en` + `zh` in the manifest
   (`descriptionZh`); other locales fall back to `en`.
3. README bodies + blog posts: as-authored (linked, not translated).

### Canonical copy (Owner-provided translations — use verbatim)

Tagline `Reliable infrastructure for the AI era.`:

- zh: 面向 AI 时代的可靠基础设施。
- es: Infraestructura fiable para la era de la IA.
- fr: Une infrastructure fiable pour l'ère de l'IA.
- de: Zuverlässige Infrastruktur für das KI-Zeitalter.
- ru: Надёжная инфраструктура для эпохи ИИ.
- ja: AI時代のための信頼できるインフラ。
- ko: AI 시대를 위한 믿을 수 있는 인프라.
- ar: بنية تحتية موثوقة لعصر الذكاء الاصطناعي.

Summary paragraph:

- en: jixoai builds the boring, load-bearing layer the AI era stands on:
  terminal runtimes, design languages, and developer tools that ship one
  honest contract at a time. Open source, evidence-gated, MIT.
- zh: jixoai 打造 AI 时代所依赖的承重层：终端运行时、设计语言与开发者工具，
  每一次交付都只给出一份诚实的契约。开源、证据门控、MIT。
- es: jixoai construye la capa de carga sobre la que se apoya la era de la
  IA: runtimes de terminal, lenguajes de diseño y herramientas para
  desarrolladores que entregan un contrato honesto a la vez. Código
  abierto, con evidencia verificable, MIT.
- fr: jixoai construit la couche porteuse sur laquelle repose l'ère de
  l'IA : runtimes de terminal, langages de conception et outils pour
  développeurs qui livrent un contrat honnête à la fois. Open source, à
  preuve d'usage, MIT.
- de: jixoai baut die tragende Schicht, auf der das KI-Zeitalter ruht:
  Terminal-Runtimes, Designsprachen und Entwicklerwerkzeuge, die jeweils
  einen ehrlichen Vertrag liefern. Open Source, evidenzbasiert, MIT.
- ru: jixoai строит несущий слой, на котором стоит эпоха ИИ: терминальные
  рантаймы, языки дизайна и инструменты для разработчиков, поставляющие
  по одному честному контракту за раз. Открытый код, доказательная база,
  MIT.
- ja: jixoai は AI 時代が依拠する基幹レイヤーを構築します。ターミナルラ
  ンタイム、デザイン言語、開発者ツール — 一度に一つの誠実な契約を届け
  る。オープンソース、エビデンスゲート、MIT。
- ko: jixoai는 AI 시대가 기대는 기반 계층을 만듭니다: 터미널 런타임, 디자
  인 언어, 개발자 도구 — 매번 하나의 정직한 계약을 전달합니다. 오픈소
  스, 증거 기반, MIT.
- ar: تبني jixoai الطبقة الحاملة التي يقف عليها عصر الذكاء الاصطناعي:
  بيئات تشغيل طرفية، ولغات تصميم، وأدوات للمطورين، تُسلِّم في كل مرة
  عقدًا واحدًا صادقًا. مفتوحة المصدر، مبنية على الأدلة، MIT.

Project descriptions (`descriptionZh`, manifest):

- unipty: 运行时中立的 PTY 库，面向 Node、Bun 与 Deno —— 一份公共契约、开
  发者可选择的 Backend、以证据门控的支持声明。
- openspecui: OpenSpec 驱动开发的 Web UI 伴侣 —— 一条命令即可服务、预览
  并导出规范驱动的项目。
- ui: 以 shadcn registry 形式发布的 jixoai 设计语言：终端美学、OKLCH 单
  色相法则、拷贝即所有的 mono-first 组件。
- opentray: 面向 CLI 与 AI skill 生态的桌面状态运行时 —— 托盘优先的应用，
  跑在 Node、Bun 与 Deno 上。
- opendweb: 应用级组网平台：让多设备应用组成逻辑网络 —— 像游戏房间而非系
  统级 VPN，QUIC 直连优先、可自托管 Relay。
- openiweb: 面向普通人的开源个人应用节点：不懂容器与运维也能自托管，把
  MCP 端点与一把密钥交给 AI 编程代理即可部署运维。

Short UI labels: translate consistently per locale (nav Projects/Blog,
links Official site/GitHub/README, Latest posts, All posts, Published,
Read more, back links); keep `jixoai`, package names, and code verbatim.

### Repo README pair

- Add a concise `README.md` (site overview, build, deploy, config seams)
  and `README-zh.md` (faithful translation) at the repo root with the
  family's language cross-link line.

### AI export

- llms export mirrors every locale's public pages with absolute URLs
  (hreflang-consistent).

## Capabilities

### New Capabilities

- `localization`: the 9-locale surface, tiers, RTL, hreflang, switcher.

### Modified Capabilities

- `project-hub`: manifest gains `descriptionZh` (zh tier for curated copy).
