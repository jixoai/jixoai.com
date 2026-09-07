# 2026-09-07 — Writing-craft distillation for release-blog

Consumer: `skills/release-blog/SKILL.md` (jixoai.com). That skill already owns
STRUCTURE (layers, templates, title laws, link discipline, frontmatter). This
file owns CRAFT: how to write and revise the sentences themselves, for an AI
author, zh-primary with en mirrors. Every rule below traces to a source skill
or article, tagged as `[source]`.

Local sources (read in full):
`gaubee-writer` (+ references/voice-model.md, human-writing-audit.md,
corpus-evidence.md), `writing-fragments`, `writing-beats`, `writing-shape`,
`edit-article`, `teach`, global `~/.agents/AGENTS.md`.

Web supplement (4): arXiv:2406.07016 excess-vocabulary study;
qu-ai-wei SKILL.md (LifelongLazyLearner); tbhb/vale-ai-tells; Every.to em-dash
discourse + Zhihu zh-AI-sentiment thread.

---

## 1. Per-source technique inventory

### 1.1 gaubee-writer (SKILL + voice-model + human-writing-audit + corpus-evidence)

The richest source. Core thesis: "把风格理解为一套可重复的认知动作，而不是
口头禅" — style = repeatable cognitive moves, not catchphrases. Key systems:

**约束账本 (constraint ledger)** — before writing: 载体、字数、格式、
必须保留项、必须删除项、来源和验证状态. Word counts are hard constraints;
shortfalls are filled by restating mechanism/boundary, "不添加新事实".

**事实边界 (fact-strength rules)** — verbatim, this is the strongest single
list in the corpus:
> 不升级事实强度：一次观察不能写成"稳定复现"，相关性不能写成因果，
> 可能性不能写成事实，局部体验不能写成普遍结论，未测试不能写成性能结果。

**过程骨架 (process skeleton)** — order arguments 按面向过程: 具体观察 →
矛盾/约束 → 拆角色、状态、数据、时间 → 机制+代码验证 → 成本、失效条件 →
当前位置/下一步. Not every post runs the full chain; a 短评 can stop at
observation.

**起草 rules (8)** — highlights:
- "直接进入问题或判断，省略'本文将''让我们深入了解'等开场。"
- "一段只推进一个意图。优先让段落承担因果、对比、例证或边界中的一个任务。"
- 归纳词 gate: "先说明机制，再使用'本质上''第一性原理'等归纳词。归纳词后
  必须有可检验的缩减结果，不能只是提高语气。"
- "让技术名词、代码、链接、版本、时间和失败现象承担可信度，不用宣传形容词
  替代证据。"
- "保留必要的不规则：长短句变化、括号内补充、局部自我修正…不要把文字抛光
  成无个人位置的新闻稿。"

**审校 gate order** — "前一关不通过，不要靠润色补救":
```
约束关 → 事实关 → 结构关 → 机制关 → 人味关 → 声纹关
```
plus the cluster principle: "只按'成组出现'的模式判断 AI 痕迹，不因单个词、
一次排比或一处长句就重写。"

**human-writing-audit** — model default vs human effective path:
```
普泛表述→有来源的特殊细节  补齐对称结构→为目的主动省略
扩大意义→解释眼前因果      隐藏缺口→承认不知道或仍然矛盾
模仿观点语气→承担可解释的编辑选择
```
Four high-risk pattern clusters: 内容责任缺失 (meaning inflation, unnamed
authorities, 泛化积极结尾); 语言逃避 (hedging/filler, 被动与无主句, synonym
rotation → object-name drift, "核心在于" without reduction); 结构自动完成
(凡事凑成三项、否定式排比、无尺度意义的"从 X 到 Y"、标题后暖场句、预告式
写作、刻意金句、舞台式开场); 格式与聊天残留 (机械粗体、过度破折号、
"希望有帮助"、元话语"值得强调/这体现了团队").
Human signals to PRESERVE: "精确而难以凭空生成的地点、版本、报错、时间、链接
和操作细节"; unresolved likes-and-doubts; "长短句变化，以及真正补充信息的
括号、自我修正和题外话". Punctuation law: "默认删除新生成正文中的英文 em
dash/en dash 和用双连字符模拟的破折号；代码、引用和专有文本除外。"
Seven-step audit: 对账 → 追责 → 查簇 → 重写 → 回声 → 朗读 ("检查节奏和
转折是否来自思路，而不是连接词堆叠").

**voice-model zh 声纹** — the rhythm law: "允许长因果句展开推理，再用短句
钉住位置。不要把全文切成连续口号。" Connective discipline: "'但是''不过'
'其实''所以''因此'负责改变推理方向。没有逻辑转折时不要为了像而添加。"
Speculation marking: 推测用"也许""假设"并交代依据; "我" for real
experience, "我们" only for shared reasoning. Language mixing: "保留准确的
API、协议和项目名，不为'中文化'牺牲精度。"

**corpus-evidence** — four reusable moves: 从异常进入 (open on a concrete
anomaly); 从表象缩减为过程 (reduce abstract nouns to processes); 让边界进入
结论 ("在什么条件下值得", never "最好"); 用技术对象承载可信度. And the
warning: "词频不是身份…不能按频次撒入连接词."

### 1.2 writing-fragments (explore phase)

Fragments = "any piece of text that might survive", readable by the author,
not cold-reader-comprehensible; deliberately heterogeneous (sharp sentences,
claims+one-line justification, vignettes, half-thoughts, quotes, complaints,
"leading words"). The **leading word** is the highest-value fragment: "one
term that names the idea, the way _tracer bullets_ or _fog of war_ names a
whole pattern… it shapes the structure, the transitions, and the title
later." For release posts the leading word is the coinage a feature earns
(e.g. 「兼容窗口」, 「证据面」).

### 1.3 writing-beats (exploit)

**Beat** = one move that "sets a scene, lands a point, asks a question, drops
an aside, twists the angle. Then it stops." Sizing: one sentence if that's the
whole move; split test: "If a 'beat' needs five paragraphs and three
subheadings, it's not a beat — it's two beats glued together. Split it."
**Grounding**: every concept must be grounded (prerequisite or introduced)
before a beat leans on it; "the unit is the concept, not the word" — a beat
can lose the reader with zero jargon in sight. Offer 2–3 candidate next beats
per step; "the article ends when the journey is complete — not when the pile
is empty" (leftover material is fine, intended).

### 1.4 writing-shape (exploit)

Draft 2–3 candidate openings, each implying a different thesis; chosen opening
defines what the rest must do. Growth question: "given this opening, what does
the reader need to hear next?" Pushback moves for revision:
- "What does this paragraph do for the reader that the previous one didn't?"
- "If I cut this, what breaks?"
- "This sentence is doing two jobs — split it or pick one."
- "The opening promised X. We've drifted to Y. Either re-thread it or change
  the opening."

Format arguments (deliberate, defensible): **prose carries argument; lists
carry parallel items — if items aren't truly parallel, prose is better.**
Table only when the same shape repeats 3+ times with the same fields.
Quote "when the original wording is the point"; paraphrase when only the idea
matters. Gap-naming when the pile lacks needed material: ask or cut, never pad.

### 1.5 edit-article

Two mechanical rules: (1) "information is a directed acyclic graph… Make sure
that the order of the sections and their contents respects these dependencies"
— sections sorted by information DAG; (2) "Use maximum 240 characters per
paragraph" — hard paragraph-length cap (~3-4 zh lines).

### 1.6 teach

Relevant fragments for blog craft: one tightly-scoped thing per unit, "each
lesson should give the user a single tangible win"; "lessons should be
littered with citations — links to external resources to back up any claim
made" (maps onto release-blog link discipline); knowledge acquisition wants
difficulty low / skill acquisition wants effortful retrieval. Mostly learning
design — thin for prose craft, cited where it echoes.

### 1.7 Global ~/.agents/AGENTS.md

Code/architecture-focused. Writing-adjacent only: "极简叩问" (never ask
known facts; questions only for 不可调和矛盾/取舍/边界) and "无法验证时必须
坦诚告知" — honesty-when-unverifiable, which reinforces the 事实边界 rules.

### 1.8 Web supplement

- **arXiv:2406.07016** (Kobak et al., 14M PubMed abstracts 2010–2024): at
  least 10% of 2024 abstracts LLM-processed, detected via "excess vocabulary"
  — style words (delve, intricate, underscore, showcasing, pertinent,
  commendable) surging after ChatGPT. Follow-ups show the tells recede once
  publicly named: avoidance works.
- **qu-ai-wei** (zh): eight pattern families scanned in order; register only
  tunes thresholds; symmetric skeletons "要重建，不做同义换壳"; "主干不要
  长期被「在……背景下 / 基于…… / 通过……」压后"; "打破等长句和同构段落，
  合并碎句，拆开过载长句"; anti-fake-human: "不要为了'人味'添加错别字、
  emoji、网语…自然不等于口语化"; six-step workflow starting from a frozen
  information ledger (people/facts/numbers/quotes/hedges), 【需作者确认】
  block for logic risks, full re-scan for "同义重复、机械对称、推论台阶和
  整齐收尾".
- **tbhb/vale-ai-tells** (131 mechanical en rules): contrastive formulas
  ("It's not just X; it's Y", bare appositives "a refinement, not a rivalry");
  verb tricolons ("build, test, and deploy") + tricolon density; noun strings
  ≥4; stacked hedges ("could potentially"); opening clichés; semicolon-as-dash
  substitute; participial padding (flagged as the #1 discriminator, "527% of
  human rate" per the PNAS study it cites); MicDrop ("Full stop.");
  documented limitation: uniform ~27-word sentences / 3–5-sentence paragraphs
  need length-distribution checks, not token matching.
- **Every.to / editor discourse**: em-dash overuse was an editor pet peeve
  before AI (former Slate editor Noreen Malone side-eyed it); AI merely
  industrialized it. **Zhihu 哪些话一出现就是 AI**: zh correlatives
  「不仅…而且」「既…又」「一方面…另一方面」 as symmetric-skeleton signals.

---

## 2. CRAFT checklist for technical release posts

### 2.1 Drafting rules (apply while writing)

D1. **Cold open.** First sentence after any heading is the point itself —
never a 暖场 restatement of the heading, never 本文将/接下来深入了解/让我们.
[gaubee-writer 起草1, human-writing-audit 结构自动完成]

D2. **One intention per paragraph; one job per sentence.** A paragraph carries
exactly one of 因果/对比/例证/边界. A sentence doing two jobs gets split or
picks one. [gaubee-writer 起草2, writing-shape pushback]

D3. **Rhythm law: long-then-pin.** Let one long causal sentence run its
reasoning, then nail the position with a short declarative. Forbidden: 全文
连续口号 (all-staccato) AND 无喘息的长句串联 (no pins). Mechanically: in
each paragraph of ≥3 sentences, at least one ≤10 chars (zh) / ≤6 words (en),
and not all sentences within ±20% of the same length. [voice-model 中文声纹,
human-writing-audit 应保留信号, vale ParallelStaccato/qu-ai-wei 等长句]

D4. **Grounded-before-used.** Every concept a section leans on is either a
prerequisite (readers of this repo's blog have it) or introduced by an earlier
block — concept, not word. Before writing a 亮点 section, list what it
requires (e.g. 「能力门控」 needs 「契约」 needs 「验证发现」). [writing-beats/
writing-shape Grounding]

D5. **Beat-sized sections.** Each 亮点 = one move: 痛点 → 方案 → 证据 → 链接.
If a highlight needs 5 paragraphs and 3 subheadings it is two highlights —
split. [writing-beats beat test, release-blog 亮点 template]

D6. **Specificity carries credibility.** Versions, APIs, error strings,
commands, byte/ms/issue counts, commit SHAs. Never let 强大/优雅/显著 stand
where a number or identifier could. Adjectives are permitted only where no
measurement exists — then one, and earned. [gaubee-writer 起草5,
corpus-evidence, release-blog tone law]

D7. **Fact-strength ceiling.** 一次观察≠稳定复现; 相关性≠因果; 可能性≠事实;
局部体验≠普遍结论; 未测试≠性能结果. Performance claims carry a baseline or
don't ship. [gaubee-writer 建立事实边界6, release-blog]

D8. **归纳词 gate.** 「本质(上)」「第一性」「核心在于」 may appear only
AFTER the mechanism is explained, and must be followed by a checkable
reduction (many surfaces → one constraint). Otherwise delete the word, keep
the sentence. [gaubee-writer 起草3, human-writing-audit 语言逃避]

D9. **Speculation marking.** Unverified claims get 也许/假设/预计 + the
reasoning, or move to 待验证 outside the body. "我" only for real decisions
jixoai actually made; "我们" only where the reader co-operates (e.g. walking
the migration command). [gaubee-writer 起草4, voice-model]

D10. **Boundary conclusions.** Prefer 「在什么条件下值得用/被挡/失效」 over
「最好/最强/完胜」. Name the failure mode of the thing you shipped.
[corpus-evidence 让边界进入结论, gaubee-writer 过程骨架 step 5]

D11. **Keep necessary irregularity.** One parenthetical aside that adds real
information, one self-correction, one admitted unresolved tension — these are
signals, not flaws. Polish must not flatten them into 新闻稿. [gaubee-writer
起草6, human-writing-audit 应保留信号]

D12. **The one emotional sentence.** release-blog allows at most one 情绪化
语句 per post — spend it at the milestone close or the 痛点 peak, as a cold
declarative ("It's done."-grade), never as exclamation stacking.
[release-blog tone law + gaubee 冷句 discipline]

### 2.2 Revision passes (run in this order; a failed gate stops the pass chain)

R1. **对账 (ledger).** Word-count class (里程碑 1500-3000 / 例行 ≤1000),
must-keep facts (L1 body, changelog, openspec archive), frontmatter repo/
version. Nothing added beyond the sources. [gaubee-writer 约束关, qu-ai-wei
step 1, release-blog workflow]

R2. **追责 (fact audit).** Every strong assertion: who observed, on what,
applying to what range? Hunt strength upgrades (D7 list). Unsourced → cut,
mark 待验证, or downgrade to explicit hypothesis. [gaubee-writer 事实关,
human-writing-audit step 3]

R3. **结构 (structure).** Per paragraph ask writing-shape's four questions
(what does it do the previous didn't / if I cut it what breaks / two jobs /
opening-promise drift). Section order respects the information DAG.
Paragraph cap 240 chars. [writing-shape, edit-article, gaubee-writer 结构关]

R4. **机制 (mechanism).** Does each 亮点 explain how it happens and when it
fails? A section that only renames the changelog entry fails here.
[gaubee-writer 机制关]

R5. **查簇 (AI-tell sweep).** Apply §2.3. Judge by clusters: ≥2 patterns
co-occurring in one paragraph is the crime; a lone em dash or one 排比 is not.
[gaubee-writer 审校 cluster principle, qu-ai-wei, human-writing-audit step 4]

R6. **朗读 (rhythm read).** Read aloud (mentally, full speed). Transitions
must come from the thought, not from connective pile-up; long-then-pin holds;
no paragraph is a wall or a machine-gun. Fix by restructuring, not by swapping
connectives. [human-writing-audit step 7 朗读, voice-model]

R7. **en-mirror pass.** See §2.4. Then `npm run build` green. [release-blog]

### 2.3 AI-tell avoidance list

Judgment rule first: **density, not presence**. zh 对仗/排比/成语 are native
and legitimate; qu-ai-wei's threshold is recurrence within a short span
(~200 字). A single occurrence of anything below is not a finding.

**zh-specific:**
- 「不仅…还/而且」「既…又」「一方面…另一方面」 running empty — the two
  halves must add information; if B restates A, cut to single direct
  statement. Symmetric skeletons get rebuilt, "不做同义换壳" (not
  synonym-swapped). [Zhihu thread, qu-ai-wei, human-writing-audit]
- 四字滥调 clusters — decorative idioms (强大、优雅、无缝、极致、赋能、
  保驾护航) with no measurement behind them; keep only idioms that carry
  real mechanism. [qu-ai-wei 修辞/节奏 family, gaubee-writer 宣传形容词]
- 的/了/地 particle chains and 推后主干 — "主干不要长期被「在……背景下 /
  基于…… / 通过……」压后": rewrite so subject+verb lead; delete functionless
  particles/fillers. [qu-ai-wei 简体中文句法 family, human-writing-audit
  过度限定/填充词]
- 凡事凑成三项 / 否定式排比 / 无尺度意义的「从 X 到 Y」 [human-writing-audit
  结构自动完成]
- 标题后暖场句; 预告式写作（接下来我们深入了解）; 舞台式开场（说实话、
  问题来了）; 刻意金句; 假装收尾的「未来可期」泛化积极结尾 [human-writing-
  audit, gaubee-writer 审校 deletion list]
- 元话语: 「值得强调的是」「需要特别说明」「这体现了团队……」 adding no
  fact → delete [human-writing-audit 格式与聊天残留]
- Meaning inflation: 版本号发布 ≠ 时代转折/里程碑式变革; unnamed authorities
  （业内普遍认为）[human-writing-audit 内容责任缺失]
- Connective sprinkling: 但是/不过/其实/所以/因此 only where a real turn
  exists [voice-model, corpus-evidence 词频不是身份]

**en-specific (mirrors):**
- Contrastive formulas: "not just X; it's Y", "Not only X but also Y", bare
  appositive "a refinement, not a rivalry" [vale-ai-tells ContrastiveFormulas]
- Verb tricolons ("build, test, and deploy") and ≥4-noun strings
  [vale-ai-tells VerbTricolon/NounString]
- Excess-vocabulary register: delve, comprehensive, unprecedented,
  sophisticated, leverage/vNavigate/showcase/harness/unleash/democratize,
  utilize/facilitate [vale-ai-tells, arXiv:2406.07016]
- Hedge stacks ("could potentially", "may possibly") and openers ("It's
  important to note", "In today's fast-paced world") [vale-ai-tells]
- Participial padding ("Standing on the shoulders of…, this release…")
  [vale-ai-tells, citing PNAS 527%]
- Mic drops ("Full stop."), closing pleasantries [vale-ai-tells]
- Semicolon-as-dash substitute; ASCII "--" [vale-ai-tells, human-writing-audit]

**Both languages:**
- em dash: default-delete in generated prose (code/quotes/专有文本 exempt);
  budget at most 1 per post, en mirror included. [human-writing-audit
  punctuation law, em-dash discourse]
- Sentence-length sameness: hunt paragraphs where every sentence is ~the same
  length (en studies say ~27 words / 3–5 sentences per para); break by
  merging or pinning [vale-ai-tells documented limitation → manual check,
  qu-ai-wei 等长句]
- Synonym rotation → object-name drift: one term per concept for the whole
  post (「兼容窗口」 stays 「兼容窗口」, never alternates 兼容范围/适配窗口)
  [human-writing-audit 语言逃避, writing-beats grounding]
- 机械粗体/装饰性 emphasis; bullets where prose should argue
  [human-writing-audit, writing-shape format arguments]

**Never do while de-AI-ifying:** add fake typos, emoji, 网语, first-person
anecdotes or borrowed 粗口 for "human flavor" — "自然不等于口语化".
[qu-ai-wei anti-fake-human, gaubee-writer 防止表演式模仿]

### 2.4 en-mirror specifics

M1. **Translate the cognitive structure and stance strength, not the words**
(gaubee-writer: "迁移认知结构和立场强度，不要逐字翻译"). The en post must
read as if written by the same engineer in English, with equal directness.

M2. **Structure isomorphic** (release-blog law): section-by-section alignment,
same date, same facts, same links; the craft rules D1–D12 apply independently
in English.

M3. **zh→en transforms:** 四字格 → plain clause ("开箱即用" → "works without
configuration", not "out-of-the-box-ready excellence"); 的-chains → relative
clause or split sentence; 「从 X 到 Y」 scale claim → the concrete range
("from 3.x in June to 11.x in August"). [qu-ai-wei syntax families,
operationalized for translation]

M4. **en-only tells (§2.3 en list) get their own sweep** — the zh post can be
clean while the mirror trips tricolons/hedges/excess vocabulary, because
those are generated fresh in English.

M5. **Technical nouns identical across both** — APIs, error strings, CLI
flags, package names never localized. [voice-model language mixing]

M6. **Punctuation asymmetry:** zh uses 「」 and full-width marks; en mirror
obeys the em-dash budget strictly (em dash reads louder in en, and it is the
single most-cited fingerprint). [human-writing-audit, em-dash discourse]

---

## 3. Phase mapping

| Technique | Phase | Notes |
|---|---|---|
| leading-word coinage (§1.2) | pre-draft | name the 亮点's concept before writing; it fixes title & transitions |
| grounding list / prerequisites (D4) | pre-draft | settle per section before prose |
| D1–D6, D11 | drafting | sentence-level habits |
| D7–D10 | drafting + R2 | write within the ceiling, verify in pass |
| R1 对账 → R2 追责 → R3 结构 → R4 机制 | revising | gate order; earlier failure blocks later passes |
| R5 查簇 (§2.3) | revising | cluster-based sweep, density thresholds |
| R6 朗读 | revising | rhythm final check |
| M1–M6 (§2.4) | en mirror | its own drafting+revising mini-cycle |
| D12 one emotional sentence | both | budgeted at draft, checked at R6 |

Draft-time rules are habits; revision passes are hunts. The single most
load-bearing pair for this blog: **fact-strength ceiling (D7/R2)** and
**cluster-based AI-tell sweep (R5)** — everything else supports those two.
