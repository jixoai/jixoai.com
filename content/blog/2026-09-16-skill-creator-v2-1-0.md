---
title: "Skill Creator v2.1.0: $ and @ references, queue editing, and the MCP tools fix"
date: 2026-09-16T14:13:36Z
description: Skill Creator v2.1.0 bundles the 30 commits since v2.0.2. The composer input reaches the official web client semantics: Enter is IME-safe, attachments are checked as a batch, / carries both commands and skills, and a running session accepts queue or steer. @ file and session references are joined by a $ cross-workspace skill reference with fuzzy search and server-side document expansion. The message queue gains edit, remove, and steer. Roles move onto DSH 0.1.6 native subagents. The in-session mcp__skill-creator__* tools that never connected are fixed. The kernel's DSH data directory now defaults inside the app directory. No persisted-state breaking changes.
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

Skill Creator v2.1.0 is out (2026-09-16). It bundles the 30 commits since v2.0.2: 13 feat, 5 fix, and 9 docs by commit prefix, with 3 more across chore and test. Three things stand out. The composer input reaches the official web client semantics. The in-session MCP tools that never connected are fixed. The kernel's DSH data directory moves into the app directory by default. No persisted-state breaking changes; upgrading is just the version bump.

## Input: typing, attachments, and submission

The v2.0 input worked; this release aligns it with the official web client, in four steps.

Typing. Enter no longer submits half-typed IME text — composition sessions and a 10ms grace window after composition end both count as typing. Pasted external text passes a sanitizer for invisible placeholder characters. Clearing the input after a successful send drops the native undo stack with it, so Cmd+Z cannot bring sent text back. The placeholder picks the most specific of four states: editing, disconnected, session unavailable, current mode.

Attachments. Images and files are checked as a batch: any count or size violation rejects the whole batch, at 4 images of 4MiB each and 2 files of 512KiB each. Enter holds while files are still being read, with a notice to retry shortly. The drop target covers the whole window, and a drop anywhere goes through the same checks.

Trigger. `/` carries both commands and skills, commands first; the `+` button expands the full directory with nothing typed. Input-taking commands hold the input line: once the command name settles the menu yields, and backspacing the name exits.

![The unified / menu above the input: the Commands group lists /compact, /queue, /steer with descriptions, the Skills group follows, and /compact is highlighted](/blog-assets/2026-09-16-skill-creator-v2-1-0/slash-menu.png)

Submission. While a turn is running, Enter follows your preference to queue or steer, and Cmd/Ctrl+Enter inverts it. The preference sticks and is editable in settings. Drafts follow their sessions, survive switches, and clear only on successful send. The stop button cancels the current turn and leaves queued messages in place.

## References: `@` for files and sessions, `$` for skills

`@` opens two reference groups. Files browse directories: directory rows drill deeper, `..` goes up. The sessions group excludes the current session. A pick drops a `@name` reference into the input, drawn as a solid block of background color that backspace deletes whole. Submission carries only references still present in the text, and the server expands the content: files go through the same checks as attachments (absolute path, real path, 512KiB, textual extension), sessions become bounded transcript excerpts (last 30 text entries, 24k characters), injected as `[reference: …]` text blocks.

![The @ menu above the input: a "Files from" subtitle names the current directory, with directory entries and a highlighted first row](/blog-assets/2026-09-16-skill-creator-v2-1-0/at-menu.png)

`$` is the new skill reference, split cleanly from `/`: `/name` runs a skill as a command, `$name` brings the skill document into the conversation as reference. The menu spans every workspace, grouped by `Workspace / provider`: 916 skills across 44 groups on the dev machine, disabled ones excluded. Search is fuzzy: case-insensitive, letters matching in order, contiguous runs and word starts ranking higher, description hits adding a small bonus. Same-named skills from different workspaces list side by side and pair by order of appearance.

![The $ menu above the input: "916 skills · 44 provider groups", the GLOBAL WORKSPACE group with candidates like $agents-sdk, first row highlighted](/blog-assets/2026-09-16-skill-creator-v2-1-0/dollar-menu.png)

A pick drops `$name` into the input with exactly the `@` mechanics: solid background, whole-block backspace, checked at send time. The server receives the workspace, provider, and skill identifiers, resolves them, reads SKILL.md, and expands it into a `[reference: skill name · provider]` block truncated at 200k characters. A skill that no longer exists rejects the whole message with an explicit error.

![The $agents-sdk reference inside the input: a light green rounded background, with the toolbar row intact below](/blog-assets/2026-09-16-skill-creator-v2-1-0/dollar-chip.png)

## The queue: edit, remove, and steer

The queue goes from a read-only list to something you can operate on. The pencil edits text in place, and images and attachments survive the save. The x removes, addressed by the kernel's message identifier. Steer turns a running session's next queued message into a next-step intervention, and the button disables while the session is idle. In-flight messages show as sending until the kernel confirms and the real queue takes over, with identical text deduplicated. `/name` entries matching the skills catalog pick up a background tint, and the Enter preference is editable from both the settings page and the `/queue` `/steer` commands, one change applying to both.

## Roles: on DSH native subagents

The kernel's DSH family moves from 0.1.5-rc.2 to 0.1.6-alpha.1, 22 @deepseek-ai packages in total. The role system uses the official subagent capability directly instead of building its own bridge. A role is a subagent definition: a versioned persona, tools gated by session mode, and a unique role tool name. A subagent's spawn, join, and cancel all show in the agent panel; the tool-narrowing rules apply to subagents too, so focused modes cannot be bypassed. The kernel mounts 94 entries on the dev machine.

## Behavior change: the kernel data directory moves into the app directory

The daemon used to read and write `~/.dsh` directly. Incompatible state in your DSH directory, say a corrupted profile, broke the whole agent kernel mount. The default is now `<home>/.skill-creator/dsh-home`: first boot creates the empty directory, the model-route settings.yaml and credentials write into the same place, and your `~/.dsh` is left alone by default. To keep using the original directory, set one variable:

```bash
DSH_HOME=~/.dsh skill-creator start
```

## Fix: in-session MCP tools work again

The in-session `mcp__skill-creator__*` tools never actually connected. The kernel's MCP client speaks the 2026-07-28 protocol version; the daemon endpoint accepted at most 2025-11-25 and rejected the newer header with a 400. The fix moves the endpoint to `@modelcontextprotocol/server@2`: newer clients negotiate through `server/discover`, 2025-line clients keep the `initialize` handshake, and both paths work. A regression test drives a real v2 client through the HTTP endpoint, negotiates, and calls a tool; the dev environment log shows zero protocol errors. The stdio form moves in the same pass.

## Fixes and polish

- **Settings → Model scrolling**: the right pane switches scroll ownership per section; inside Model, the tab-content area is the only vertical scroller. The provider gallery loses its own scrollbar, a layout defect's phantom horizontal scrollbar is gone, and the tab strip only captures the wheel while it can actually scroll. Verified container by container, desktop and narrow, light and dark.
- **Early-open race**: opening the agent panel before the WebSocket connected tripped an infinite Svelte effect loop and killed app reactivity. The lazy load now gates on connection status.
- Menu selected rows get a darker tint, queue row actions move from bare 12px icons to 24px pads with larger click targets, and the steer button gains a visible disabled state.
- CI restores the full gate: hermetic global skill roots in tests, and the web-mode browser smoke test runs in a dedicated ubuntu CI job.

## Site and docs

The project site took three passes: typography, motion, and content closeout (caption verification, accessibility fixes, JSON-LD). The README becomes a bilingual pair, English canon plus a Chinese mirror, maintained in sync.

## Upgrading

```bash
npm install -g skill-creator@2.1.0
```

No persisted migration. The one behavior change is the kernel data directory default; the previous section carries the rollback switch.

## Links

- Changelog: [GitHub Release v2.1.0](https://github.com/jixoai/skill-creator/releases/tag/v2.1.0) · [compare v2.0.2...v2.1.0](https://github.com/jixoai/skill-creator/compare/v2.0.2...v2.1.0) · [CHANGELOG](https://github.com/jixoai/skill-creator/blob/v2.1.0/CHANGELOG.md)
- Change archives: [composer-skill-refs-and-platform-fixes](https://github.com/jixoai/skill-creator/tree/v2.1.0/openspec/changes/archive/2026-09-16-composer-skill-refs-and-platform-fixes) · [composer-references-queue-actions](https://github.com/jixoai/skill-creator/tree/v2.1.0/openspec/changes/archive/2026-09-16-composer-references-queue-actions) · [dsh-alpha-native-subagents](https://github.com/jixoai/skill-creator/tree/v2.1.0/openspec/changes/archive/2026-09-16-dsh-alpha-native-subagents)
- Docs: [README](https://github.com/jixoai/skill-creator/blob/v2.1.0/README.md)
- On this site: [Skill Creator v2.0](/blog/2026-09-15-skill-creator-v2-0-0/)
- Feedback: [GitHub Issues](https://github.com/jixoai/skill-creator/issues)
- Chinese version: [/zh/blog/2026-09-16-skill-creator-v2-1-0/](/zh/blog/2026-09-16-skill-creator-v2-1-0/)
