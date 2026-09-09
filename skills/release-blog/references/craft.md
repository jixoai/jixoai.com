<!--
  references/craft.md — the CRAFT layer of the release-blog skill
  (Owner directive 2026-09-07: the skill taught structure, not writing).

  Provenance: distilled from the local writing skills (gaubee-writer
  incl. voice-model + human-writing-audit, writing-beats,
  writing-fragments, writing-shape, edit-article, teach) plus a web
  sweep of AI-tell editorial advice. Full per-source inventory with
  quotes: .agents/research/2026-09-07-writing-craft.md (§1) — read it
  when a rule here needs its reasoning.

  How to use: D-rules are drafting habits; R-passes are gate-ordered
  revision hunts (a failed gate stops the chain); §AI-tells judges by
  CLUSTERS (density, not presence); M-rules govern the en mirror.
  The most load-bearing pair: D7/R2 fact-strength ceiling and R5
  cluster-based AI-tell sweep.
-->

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

D13. **Metaphor restraint (Owner law 2026-09-07, reader fatigue).**
   Technical posts carry AT MOST one metaphor, and only AFTER the
   mechanism is explained, as a positioning aid. Banished categories:
   food/course metaphors (主菜/前菜/加餐), gambling (赌注/筹码), naval
   (同船/另一翼/接缝/落锚), game-room/network storytelling
   (像游戏房间一样), and any 像X一样/如同/好比 simile that decorates
   instead of explains. Plain statement beats figure: 「0.2.0 补上了
   最后一块预留能力」 not 「最后一道接缝」. [Owner review of the
   2026-09-07 rewrite round: AI over-produces figurative framing;
   each metaphor taxes the reader once more]
D14. **Proper-noun budget.** Internal codenames (milestone tags,
   internal module nicknames, spec phases like "R2", capability
   shorthand like "findings 面") are capped at a handful per post and
   EACH first use gets a plain-language gloss, or it is cut for the
   behavioral description. API names, package names, CLI flags, error
   codes are OBJECTS, not jargon — they stay. The test: a reader who
   has never opened the repo still understands every value sentence.
   [Owner law 2026-09-07: 用大白话解释每一个 release 的价值]
D15. **Plain-language value sentence first.** Every 亮点 section opens
   with what the reader can now DO or which everyday problem stops
   hurting, in plain words, before any mechanism. If the plain-language
   version cannot be written, the highlight is not a highlight.
D16. **Code examples are required; fold the surplus.** Each 亮点 ships
   at least one runnable/typable example (CLI invocation or API call).
   When examples crowd the narrative, extras fold into
   `<details><summary>示例：…</summary>` blocks (styled by
   .markdown-body details). Never invent APIs: examples come from the
   L1 release body, the linked README/docs, or commands the post
   already asserts. [Owner law 2026-09-07]
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
same date, same facts, same links; the craft rules D1–D16 apply independently
in English. The direction people miss is the subtractive one: when the en
original carries a fact block, section, or `<details>` that the zh rewrite no
longer has, **delete it** — "same facts" means equal, not maximal. Keeping
en-only extras because they read well is the most common mirror defect.

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

M7. **Zero CJK in the en file (2026-09-09 Owner law).** The en variant is
written for readers who do not read Chinese, so no 汉字 may survive in its
prose, headings, or link labels — that includes parenthetical glosses
inherited from the zh draft (`Figure (浮)` → `Figure`) and the mirror row
(`中文主文` → `Chinese version`). The one exemption is a Chinese string that
is part of an external URL or a real file name (an identifier, not prose —
e.g. GitHub's `架构设计.md`). Sweep before shipping:
`grep -n '[\u4e00-\u9fff]' content/blog/*.md` on every non-`.zh` file.

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
