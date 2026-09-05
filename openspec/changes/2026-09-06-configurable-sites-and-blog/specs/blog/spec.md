## Purpose

The organization hub's blog: file-based markdown posts published as pure
static prerendered pages with zero server runtime.

## ADDED Requirements

### Requirement: Pure-static blog surface

The blog SHALL be file-based (`content/blog/*.md`, frontmatter: title,
date, description, author, tags), discovered at build time, and published
as prerendered `/blog/` index (newest first) and `/blog/<slug>/` pages with
zero server runtime and zero client fetches for content.

#### Scenario: publish flow

- **WHEN** a new markdown file with valid frontmatter is added and the site
  builds
- **THEN** the post appears in the index in date order and its page is
  prerendered in the Pages artifact.

#### Scenario: no server dependency

- **WHEN** the deployed artifact is served from a plain static file server
- **THEN** every blog page renders fully without any runtime API call.

### Requirement: AI export includes the blog

The `llms.txt` export layer SHALL mirror the blog index and posts alongside
the project pages, from the same single generation point.

#### Scenario: stable regeneration

- **WHEN** the build runs twice without content changes
- **THEN** all export files are byte-identical.
