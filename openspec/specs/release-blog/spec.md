# release-blog Specification

## Purpose
The project-maintained house style for writing release announcement
posts on jixoai.com/blog — the L2 narrative layer over GitHub Releases.

## Requirements

### Requirement: House style governs release posts

Every release post SHALL follow `skills/release-blog/SKILL.md`: title
formula `<Project> vX.Y.Z`, stable kebab slugs, milestone/routine
templates with motivation-led highlights, link discipline (changelog/
docs/upgrade/discussion), zh main + en mirror pairs, and the
anti-pattern rejection list.

#### Scenario: post passes the checklist

- **WHEN** a release post is authored or reviewed
- **THEN** every claim traces to the release body/changelog/openspec
  archive, each highlight carries a motivation sentence plus code or
  numbers, and the four link classes are present.

### Requirement: Blog↔projects linkage

Posts MAY declare `repo` + `version` frontmatter; when present the blog
card SHALL render a version pill linked to that release, and the build
SHALL hard-fail on a `repo` value absent from the manifest.

#### Scenario: version pill on the blog index

- **WHEN** a post with `repo: unipty` and `version: "0.2.0"` is built
- **THEN** its index card shows the pill linking the GitHub release.
