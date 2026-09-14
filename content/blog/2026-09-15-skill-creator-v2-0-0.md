---
title: "Skill Creator v2.0: the three-app workbench, model routes, and agent panel"
date: 2026-09-13T20:04:46Z
description: Skill Creator v2.0 (released 2026-09-14, currently 2.0.1) is a rewrite. The 1.x series was a CLI plus a Claude Code subagent; the 2.0 line is a local-first agent skill workbench: the Workspaces, Creator, and Repository apps handle skill management, authoring, and pinned-commit installation. Model configuration is rebuilt as route tabs (one-click connectivity tests across nine protocols), the agent panel is redesigned (context meter, /compact, $ completion, 320-720px resizing), and attachment buttons wake the OS-native file dialog, with 2.0.1 fixing the macOS dialog that never opened. Breaking changes: persisted state is not migrated (back up ~/.skill-creator first) and Node.js minimum is 24.0.0.
author: jixoai
tags: [skill-creator]
repo: skill-creator
version: "2.0.1"
lang: en
---

```text
$ git log v1.5.2..v2.0.1 --oneline | wc -l
196
```

Skill Creator v2.0 (released 2026-09-14, currently 2.0.1) is a rewrite, 196 commits in total: 82 feat, 56 fix, 36 docs, with the remaining 22 spread over test, chore, refactor, and formatting. The whole 2.0 line went through six independent review rounds (codex review agent, final PASS 9.6/10). This post covers the parts that matter most for daily use; the full list lives in the [GitHub Release v2.0.0](https://github.com/jixoai/skill-creator/releases/tag/v2.0.0) and the [CHANGELOG](https://github.com/jixoai/skill-creator/blob/v2.0.1/CHANGELOG.md).

The last 1.x release was 1.5.2 on 2026-05-21: a CLI plus a Claude Code subagent, skills named `package@version` under `.claude/skills`, documentation sliced through Context7. The 2.0 line changes shape. The CLI only manages lifecycle (`start`, `status`, `stop`); a resident daemon hosts the whole interface in its own shell, while skill discovery, validation, and installation still run through the ccski SDK and provider projection, permission boundaries, and cross-route experience belong to the app itself. Conversations come from the DSH (`DeepSeek Harness`) headless kernel, which drives sessions without shipping a UI of its own; the Manager's domain capabilities are also exposed as an MCP server (the in-daemon `/mcp` plus the `skill-creator mcp` stdio form) for the kernel and external clients, and every write proposes first and executes only after a human approves.

## Three apps

Managing, writing, and installing skills now happen in one window. That is the most visible change in 2.0.

Workspaces is the home screen. It aggregates each agent's global skill roots (the Global Workspace, `~`) with manually imported workspaces; every provider card lists the skill count, availability, and writability. Skills can be inspected, validated, enabled, or disabled, and outdated ones can be compared against the upstream lock hash and reinstalled on demand. Removing a workspace deletes only the registry entry, never the user's directory.

![The Workspaces home screen: below the title sit the four quick-action cards (Create skill, Import workspace, Scan a repo, Discover sources), and the Global Workspace section's provider cards list skill counts, availability, and actions](/blog-assets/2026-09-15-skill-creator-v2-0-0/workspaces.png)

Creator is where you write. New skills are created inside an imported Workspace.Provider, or an existing `SKILL.md` loads for editing; saves and deletes carry a content revision check, writes based on stale content are rejected, and every revision lands in the change log.

![The Creator page lists the skills in scope grouped by category, each card showing a name and a one-line description, with New skill and Open existing buttons on top](/blog-assets/2026-09-15-skill-creator-v2-0-0/creator.png)

Repository is where you install. Enter a Git source (https only); the scan session pins one commit, and preview and install share the same temporary snapshot. Multiple imported Workspace.Provider targets can be selected, installs run and get verified per skill, and only verified results receive a local skill ID. The Discover page adds curated and user sources.

![The Repository Discover page lists source cards (Skills Library v1 pointing at github.com/jixoai/skills-library and Agent Skills pointing at github.com/vercel-labs/skills), with the New scan entry in the top right](/blog-assets/2026-09-15-skill-creator-v2-0-0/repository.png)

On the security side, the server resolves workspace and provider to the real root before any mutation, the WebUI never assembles output paths, and install targets can only be imported writable Workspace.Providers, never `~`.

## Model routes

v2.0 rebuilds model configuration from one long form into a set of tabs. Every provider endpoint is a self-contained tab carrying identity icon, credential, endpoint, model list, and a remove button; adding from the catalog takes effect immediately, and duplicates number themselves (`zai-2`, `Z.ai (1)`).

Per-model configuration covers six things. modelId completion runs across providers with namespace IDs filtered; the display name is generated automatically; reasoning efforts are tags (default `low/high/max`, with standard-tier completion); context window and max output tokens accept shorthands like `0.5M` and `253k`; input and output types default from models.dev; and one click tests connectivity across all nine protocols.

## Agent panel

The panel is redesigned. Assistant messages render full width and user messages right-align as bubbles; thinking, tool, and todo rows fold and expand; the context meter shows remaining room against the current model's capacity. The `/compact` menu compresses context manually, auto-compact fires when `inputTokens >= contextWindow - maxOutputTokens`, and the transcript gets a visible marker.

`$` triggers skill-name completion, pulling a skill straight into the conversation. The panel resizes between 320-720px and becomes a drawer overlay on narrow screens; collapsing only hides it, the session survives, drafts stay isolated per session, and each role creates its session on first use.

![The agent panel in new-session state: below the session selector sit the four mode cards Create, Manage, Explore, and General, and the composer at the bottom carries attachment and model entries](/blog-assets/2026-09-15-skill-creator-v2-0-0/agent-panel.png)

## Native file and image picking

Attachment buttons wake the OS-native file dialog (daemon side, via `@xmorse/rfd`); real paths flow into prompt attachments with daemon-side size guards, and images get server-side thumbnail previews through jSquash.

2.0.1 (2026-09-15) fixes a blocking issue: on macOS the dialog never opened. The async dialog panics off the main thread in non-GUI host processes, leaving the RPC promise pending forever, and only a restart recovered. The synchronous dialog now runs in a dedicated child process, panics are isolated, a 10-minute watchdog backs it up, and failures surface a toast; a second client requesting concurrently gets an explicit "dialog is already open" rejection. See the [v2.0.1 changelog](https://github.com/jixoai/skill-creator/releases/tag/v2.0.1).

## Other changes

Session management moved into settings. Settings → Sessions lists sessions by date with per-row delete; kernel-only rows are marked and protected. The retention policy `sessionCleanupDays` defaults to 30 days and runs at daemon boot, plus a Clean-now action. Product transcripts only; `$DSH_HOME` kernel logs are never touched.

- Kernel event gate: every DSH event passes a Zod safeParse at the daemon boundary; malformed payloads drop with bounded diagnostics and never pollute frame sequencing. Assistant reasoning is persisted and replays identically after restart.
- Security surface: per the 2026-09-13 product decision, the settings view now returns the stored `providers[].apiKey` (password-masked in the UI, eye-toggle reveal); the loopback-plus-token single-user local surface is unchanged, and run/audit payloads keep structural credential redaction.
- Fixes: credentials write to the kernel's v1 `refs` layout (flat top-level keys no longer break the next DSH boot); effort tags no longer delete themselves on click; composer focus-outline and blur-clear regressions.

## Upgrading and breaking changes

There are three breaking changes.

1. Persisted state narrows on load. Unknown fields in `workspaces.json` and the skill steward (the maintenance workflow) stores are discarded per the no-compatibility policy; nothing is migrated or rewritten. Keep rollback ability by backing up before upgrading.

   ```bash
   cp -r ~/.skill-creator ~/.skill-creator.bak
   ```

2. CLI and daemon versions must match; a mismatch replaces the daemon.
3. The Node.js minimum is 24.0.0 (kernel persistence uses `node:zlib` zstd).

Install and start:

```bash
npm install -g skill-creator@2.0.1
skill-creator start
```

macOS and Windows use the native window; Linux defaults to web mode (plain tray plus the system browser), and `--web` / `--no-web` override on any platform.

## What's next

Roles as subagents with `@`-summoning are at the proposal stage with three design decisions pending; see the [roles-as-subagents proposal](https://github.com/jixoai/skill-creator/blob/v2.0.1/docs/research/2026-09-12-roles-as-subagents.md).

## Acknowledgements

Six independent review rounds (codex) ended in a final PASS 9.6/10. DSH provides the kernel and the dsh-webui panel design grammar; `@xmorse/rfd`, jSquash, models.dev, and the ccski SDK are direct dependencies of this release's highlights.

## Links

- Changelog: [GitHub Release v2.0.1](https://github.com/jixoai/skill-creator/releases/tag/v2.0.1) · [v2.0.0](https://github.com/jixoai/skill-creator/releases/tag/v2.0.0) · [compare v1.5.2...v2.0.1](https://github.com/jixoai/skill-creator/compare/v1.5.2...v2.0.1)
- Docs: [README](https://github.com/jixoai/skill-creator/blob/v2.0.1/README.md)
- Repository: [github.com/jixoai/skill-creator](https://github.com/jixoai/skill-creator)
- Feedback: [GitHub Issues](https://github.com/jixoai/skill-creator/issues)
- Chinese version: [/zh/blog/2026-09-15-skill-creator-v2-0-0/](/zh/blog/2026-09-15-skill-creator-v2-0-0/)
