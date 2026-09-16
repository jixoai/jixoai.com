---
title: "Skill Creator v2.1.0: $ skill references, dual-era MCP, and an isolated kernel home"
date: 2026-09-16T14:13:36Z
description: Skill Creator v2.1.0 bundles the 30 commits since v2.0.2. The composer reaches parity with the official webui input surface (IME-safe editor core, whole-batch attachments, the unified / trigger, queue and steer submission). @ file and session references gain a $ cross-workspace skill reference with fuzzy search and daemon-side document expansion. The queue dock gets item-level operations against the kernel inbox. Roles ride DSH 0.1.6 native subagents. The /mcp endpoint migrates to @modelcontextprotocol/server@2 dual-era serving, fixing the in-session mcp__skill-creator__* tool face. The kernel DSH home now defaults to an app-scoped directory. No persisted-state breaking changes.
author: jixoai
tags: [skill-creator]
repo: skill-creator
version: "2.1.0"
lang: en
---

```text
$ git log v2.0.2..v2.1.0 --oneline | wc -l
30
```

Skill Creator v2.1.0 is out (2026-09-16). It bundles the 30 commits since v2.0.2: 13 feat, 5 fix, and 9 docs by commit prefix, with 3 more across chore and test. Three threads run through it: the composer reaches the official webui capability matrix, the kernel side adopts DSH 0.1.6 native subagents and fixes the MCP endpoint to serve both protocol eras, and the runtime home plus the settings pane get a cleanup pass. No persisted-state breaking changes; upgrading is just the version bump.

## Composer: editor core, attachments, and submission

The v2.0 input was a usable textarea; this release aligns it with the official webui semantics, in four steps.

Editor core (W1): Enter no longer submits mid-IME composition (composition sessions and a 10ms grace window after compositionend both count as composing). Pasted external text passes a chip-placeholder sanitizer. Clearing the draft after a successful send rebuilds the textarea element, dropping the native undo stack so Cmd+Z cannot resurrect sent content. The placeholder chain picks the most specific of four states: editing, disconnected, session unavailable, mode.

Attachments (W2): images and files are preflighted as a batch. Any count or size violation rejects the whole batch (4 images at 4MiB each, 2 files at 512KiB each); while reads are pending, Enter holds with a notice. The drop overlay covers the whole window, and drops anywhere feed the same intake gate.

Trigger (W3): `/` carries both commands and skills, commands first. The `+` button expands the full directory with an empty query. Input-taking commands get a claim machine: once the token lands the menu yields, and backspacing the token exits the claim.

![The unified / menu above the composer: the Commands group lists /compact, /queue, /steer with descriptions, the Skills group follows, and /compact is highlighted](/blog-assets/2026-09-16-skill-creator-v2-1-0/slash-menu.png)

Submission (W4): while a turn is running, Enter follows the busy preference to queue or steer; Cmd/Ctrl+Enter inverts it. The preference persists and lives in Settings → Agent. Drafts are tracked per session, survive switches, and clear only on successful send. The stop button cancels the current turn and keeps queued messages.

## References: `@` for files and sessions, `$` for skills

The `@` trigger opens two reference groups: files and prior sessions. Files drill through daemon-side directory listing (directories continue the browse, `..` goes up); the sessions group excludes the current session. Picking an entry drops a plain-text `@name` token; a mirror paint layer draws the chip background under the textarea at identical metrics, and backspace at the token tail deletes it whole. Submission carries only references whose tokens still appear, and the daemon expands the content: files go through the same guard chain as attachments (absolute path, realpath, 512KiB, textual extension), sessions become bounded transcript digests (last 30 text frames, 24k chars), injected as `[reference: …]` text blocks.

![The @ menu above the composer: a "Files from" subtitle names the current directory, with directory entries and a highlighted first row](/blog-assets/2026-09-16-skill-creator-v2-1-0/at-menu.png)

`$` is the new skill reference, orthogonal to `/` command triggering: `/name` fires a skill as a command, `$name` injects the skill document as context. The menu spans every workspace with `Workspace / provider` group headers (916 skills across 44 groups on the dev machine), excludes disabled entries, and matches with case-insensitive subsequence fuzzy search: contiguous runs and word starts weigh higher, description hits add a low-weight bonus. Same-named skills from different providers list side by side and disambiguate by occurrence order.

![The $ skill menu above the composer: a "916 skills · 44 provider groups" subtitle, the GLOBAL WORKSPACE group header, candidates like $agents-sdk, and a highlighted first row](/blog-assets/2026-09-16-skill-creator-v2-1-0/dollar-menu.png)

A pick drops a `$name ` token and chip riding the same machinery as `@`: painting, atomic backspace, submit-time pruning. The daemon receives an opaque triple (workspace, provider, skill), resolves it through the registry scope, reads SKILL.md, and expands it into a `[reference: skill <name> · <provider>]` text block (truncated at 200k chars). A missing target rejects the whole prompt typed.

![The $agents-sdk chip inside the input: a light green rounded background, with the toolbar row intact below](/blog-assets/2026-09-16-skill-creator-v2-1-0/dollar-chip.png)

## Queue: a read-write face over the kernel inbox

The queue dock graduates from a read-only projection to a read-write face over the kernel's ReactLoopInbox. Inline edit preserves non-text blocks (images, attachments) on save; remove addresses items by kernel message id; steer moves a running session's next-turn item to next-step and disables otherwise. The optimistic outbox only bridges in-flight sends and retires when the durable frame arrives, deduped by exact text. `/name` tokens hitting the skills catalog pick up lexicon decoration, and the busy-Enter preference lives in one truth shared by the settings row and the `/queue` `/steer` commands.

## Roles: riding DSH native subagents

The kernel's DSH family moves from 0.1.5-rc.2 to 0.1.6-alpha.1 (22 @deepseek-ai packages), and the product consumes the official dsh-subagent capability instead of building a bridge. A role is a subagent row: a versioned persona, a mode-gated tool surface, and a unique role tool name. The subagent lifecycle (spawn, join, abort) projects into the agent panel; the tool-narrowing laws apply to subagents too, so focused modes cannot be bypassed. Product presets (persona, ask-user) arrive through the heal mirror. The kernel mounts 94 entries on the dev machine.

## Behavior change: an app-scoped kernel DSH home

The daemon used to read `~/.dsh` directly, so incompatible state in your real DSH home (a corrupted profile, say) broke the whole agent kernel mount. The default is now `<home>/.skill-creator/dsh-home`: first boot bootstraps it empty, and the model-route bridge writes its settings.yaml and credential projection into the same directory. To go back to a shared DSH home, set `DSH_HOME`:

```bash
DSH_HOME=~/.dsh skill-creator start
```

## Fix: the MCP endpoint serves both eras

The in-session `mcp__skill-creator__*` tool face was effectively dead: the kernel's MCP client rides the 2026-07-28 protocol line, and the daemon endpoint (SDK 1.30, supporting up to 2025-11-25) rejected its protocol header with 400. The fix migrates the MCP server stack to `@modelcontextprotocol/server@2`: one per-request factory serves both eras, modern clients negotiating through `server/discover` while 2025-era clients keep the `initialize` handshake. A regression test drives a real v2 client through the HTTP endpoint, negotiates, and calls a tool; the dev-stack daemon log shows zero protocol errors. The stdio face moves to `serveStdio` in the same pass.

## Fixes and polish

- **Settings → Model scroll ownership**: the right pane switches overflow per section; inside Model, the tab-content area is the single vertical scroller. The provider gallery loses its own 52vh scrollbar, the phantom horizontal scrollbar from a negative-margin escape is gone, and the tab strip only captures the wheel while it can actually scroll. Verified container by container across desktop and narrow, light and dark.
- **Early-open race**: opening the agent panel before the WebSocket connected tripped an infinite Svelte effect loop (a synchronous throw writing back its own effect inputs in the same frame) and killed app reactivity. The lazy load now gates on connection status.
- Menu selected rows get a stronger tint (primary/15), queue row actions move from bare 12px icons to 24px pads with expanded hit zones, and the steer button gains an explicit disabled state.
- CI restores the full gate: hermetic global provider roots in tests, and the web-mode browser smoke E2E runs in a dedicated ubuntu CI job.

## Site and docs

The project site took three passes: typography (family rhythm, measure caps, heading ladders), motion (a reveal cadence system and anchor landing), and content closeout (caption truth, a11y fixes, JSON-LD). The README becomes a bilingual pair, English canon plus a Chinese mirror, with facts locked in sync per the family standard.

## Upgrading

```bash
npm install -g skill-creator@2.1.0
```

No persisted migration. The one behavior change is the kernel DSH home default; the previous section carries the rollback switch.

## Links

- Changelog: [GitHub Release v2.1.0](https://github.com/jixoai/skill-creator/releases/tag/v2.1.0) · [compare v2.0.2...v2.1.0](https://github.com/jixoai/skill-creator/compare/v2.0.2...v2.1.0) · [CHANGELOG](https://github.com/jixoai/skill-creator/blob/v2.1.0/CHANGELOG.md)
- Change archives: [composer-skill-refs-and-platform-fixes](https://github.com/jixoai/skill-creator/tree/v2.1.0/openspec/changes/archive/2026-09-16-composer-skill-refs-and-platform-fixes) · [composer-references-queue-actions](https://github.com/jixoai/skill-creator/tree/v2.1.0/openspec/changes/archive/2026-09-16-composer-references-queue-actions) · [dsh-alpha-native-subagents](https://github.com/jixoai/skill-creator/tree/v2.1.0/openspec/changes/archive/2026-09-16-dsh-alpha-native-subagents)
- Docs: [README](https://github.com/jixoai/skill-creator/blob/v2.1.0/README.md)
- On this site: [Skill Creator v2.0](/blog/2026-09-15-skill-creator-v2-0-0/)
- Feedback: [GitHub Issues](https://github.com/jixoai/skill-creator/issues)
- Chinese version: [/zh/blog/2026-09-16-skill-creator-v2-1-0/](/zh/blog/2026-09-16-skill-creator-v2-1-0/)
