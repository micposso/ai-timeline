# Component Inventory

## Main app components

- `Timeline` — interactive, data-driven horizontal history of artificial intelligence
  - Previous and next controls
  - Keyboard arrow navigation
  - Scrollable event rail
  - Selected event detail panel

## App route/layout components

- `Home` — timeline page composition and JSON data binding
- `RootLayout` — root document and metadata

## Data

- `data/timeline.json` — title and event records for the timeline

## Legacy studio components

The original Mira Studio components remain in `components/` for reference and Storybook coverage, but are no longer composed by the homepage.

- `Header` — original site header, navigation, and CTA
- `Hero` — original homepage hero section
- `ProjectGrid` — original selected work/project listing
- `ProjectCard` — original individual project card
- `About` — original services/about section
- `Contact` — original contact CTA section
- `Footer` — original minimal footer

## Storybook/demo components

- `Button` — reusable Storybook button
- `Header` — Storybook demo header
- `Page` — Storybook demo page

## Summary

- 13 exported React components, including `Timeline`
- 1 internal helper component: `ArrowUpRight`
