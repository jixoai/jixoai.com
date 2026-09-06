## 1. Skill

- [x] 1.1 `skills/release-blog/SKILL.md` lands (authored from the
  research doc; self-contained laws + templates + verification).

## 2. Linkage

- [x] 2.1 Blog frontmatter schema: `repo` (must equal a manifest repo)
  and `version` keys; blog index cards render a version pill (release
  link) when present; validation at build (unknown repo → hard error).

## 3. First posts (skill-compliant, zh + en pairs)

- [x] 3.1 unipty v0.2.0 — facts from the GitHub Release body + repo
  CHANGELOG + openspec archive (2026-08-20-add-unipty-v1-pty-platform).
  (Release body is empty on GitHub; facts sourced instead from the repo
  README/git log/npm timestamps + both archived openspec changes —
  recorded in NOTES.)
- [x] 3.2 openspecui 12.0.0 — release body + repo release notes.
- [x] 3.3 ui 0.3.0 (document-ontology era) — release body + repo
  commits/changelog. (Release body is a bare Full-Changelog link; the
  release commit message 125e31f1 + openspec archive carry the facts.)
- [x] 3.4 Each post passes the skill's verification checklist (sources
  traceable, motivation per highlight, 4 link classes, stable slugs,
  frontmatter alignment).

## 4. Verify + wrap

- [x] 4.1 `npm run build` green; posts + pills spot-checked in public/
  (zh/en); llms export covers new posts, byte-identical re-run.
- [x] 4.2 NOTES.md updated (incl. the follow-up: first-release posts for
  opentray/opendweb/openiweb once their automation cuts releases);
  friction log reported.
