## ADDED Requirements

### Requirement: Localized curated descriptions

The manifest SHALL carry an optional `descriptionZh` per project; the zh
locale renders it, every other locale renders `description`.

#### Scenario: manifest-driven zh descriptions

- **WHEN** the projects surface builds with `descriptionZh` present
- **THEN** `/zh/` cards show the Chinese copy and root/other-locale cards
  show the English copy, both driven solely by the manifest.
