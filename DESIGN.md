# Mira Studio Design System

This document is the visual source of truth for AI agents working on the Mira Studio site. Preserve the established design language when adding or changing pages, components, copy, imagery, or interactions.

## Design direction

Mira Studio is an independent, senior-led creative practice. The interface should feel warm, editorial, expressive, and quietly confident: premium without feeling cold, playful without becoming noisy, and spacious without feeling empty.

The design should communicate:

- Clarity and restraint
- Human, crafted detail
- Warmth and approachability
- Strong art direction
- A small, considered studio rather than a large agency

Avoid generic SaaS styling, excessive gradients, dense dashboards, loud motion, excessive rounded cards, and visual clutter.

## Color tokens

Use the existing CSS custom properties in `app/globals.css` instead of introducing ad hoc colors.

| Token | Value | Use |
| --- | --- | --- |
| `--ink` | `#171512` | Primary text, dark buttons, navigation |
| `--muted` | `#77736c` | Secondary text, metadata, labels |
| `--line` | `#dedbd4` | Light borders and dividers |
| `--paper` | `#f7f6f2` | Warm page and hero background |
| `--white` | `#ffffff` | Cards, light surfaces, reversed text |
| `--coral` | `#ff5a52` | Accent, emphasis, active visual details |
| `--coral-dark` | `#eb4b44` | Coral hover state |
| `--navy` | `#122840` | Contact section background |

Color rules:

- Use `--paper` for the hero, about section, and footer; use `--white` for the work section.
- Use `--navy` as the single strong dark section for contact.
- Use coral sparingly for emphasis, status, numbering, and hover states.
- Keep body copy readable against its background; use `--muted` only for supporting information.
- Use translucent white or ink only for overlays, borders, and shadows where already established.

## Typography

- Primary typeface: Geist Sans through `next/font`, exposed as `--font-geist-sans`.
- Supporting display voice: Georgia or Times New Roman for italic/emphasized words.
- Monospace detail: Geist Mono through `--font-geist-mono` for section numbers and compact technical labels.
- Use tight tracking and compact line-height for large display type.
- Use generous line-height for paragraphs and supporting copy.
- Headlines are oversized and editorial, with a slight negative letter spacing; do not replace them with small, generic headings.
- Emphasized words in hero and contact headlines use coral, serif, italic styling.
- Labels and navigation are small, semibold, and often uppercase with modest tracking.

Recommended hierarchy:

- Hero `h1`: `clamp(3.25rem, 7.75vw, 9rem)`, very tight line-height around `0.91`.
- Section `h2`: large editorial display, approximately `clamp(2.4rem, 4.3vw, 4.8rem)`.
- About lead: oversized statement, approximately `clamp(2.4rem, 5.4vw, 6.2rem)`.
- Contact `h2`: largest dark-section statement, approximately `clamp(3rem, 7.5vw, 8.8rem)`.
- Body copy: comfortable reading size, generally 15–20px depending on prominence.

## Layout and spacing

- Use the shared `.section-pad` horizontal padding: `clamp(20px, 3.35vw, 64px)`.
- Keep the page spacious with generous vertical rhythm; major sections use roughly 80–150px vertical padding.
- Keep content centered within a wide layout; the header is capped at 1380px.
- Use a 12-column mental model where helpful, but prefer simple CSS Grid and flexible `minmax()` tracks.
- Favor asymmetry in composition: large statements paired with smaller supporting copy.
- Use thin borders and whitespace to separate content instead of adding more containers.
- The page shell should remain at least viewport height and clip decorative overflow without causing horizontal scrolling.

## Page structure

The current experience is a focused horizontal timeline rather than the original studio portfolio composition:

1. Minimal archive header with an `ai` mark and collection label.
2. Large editorial title and short explanatory introduction.
3. Timeline controls with current position and previous/next buttons.
4. Horizontally scrollable event rail with year, category, title, and active marker.
5. Selected-event detail panel with date, category, description, people, and a large index number.
6. Quiet footer with the subject range and archive descriptor.

## Component guidance

Use and extend the current timeline component before creating replacements.

- `Timeline`: owns event selection, controls, keyboard navigation, horizontal event rail, and detail panel.
- `data/timeline.json`: remains the content source; do not duplicate event records in JSX.
- Archive header/footer: quiet, monospaced metadata framing the main experience.
- Event rail: a thin horizontal rule, small markers, compact metadata, and one clearly active event.
- Detail panel: readable editorial heading, comfortable body copy, and restrained metadata.

The original studio components remain available for reference and Storybook coverage, but should not be reintroduced into the homepage unless explicitly requested.

## Imagery and content

- The timeline is intentionally image-free; let chronology, typography, spacing, and the active marker carry the experience.
- Keep event content in `data/timeline.json` and preserve its shape: `id`, `date`, `year`, `title`, `description`, `category`, and `people`.
- Keep copy concise, specific, and factual. Do not editorialize historical events beyond the supplied data.
- Display dates in a compact monospaced format and preserve chronological order.

## Interaction and motion

- Motion should be subtle and purposeful: short hover transitions, slight lifts, image zoom, underline reveals, and arrow movement.
- Use the existing easing and durations as a guide: approximately 180–500ms.
- Hover states should reinforce affordance without changing layout or causing content to jump.
- Keep focus-visible outlines clear: the established coral outline with a visible offset is the baseline.
- Respect `prefers-reduced-motion: reduce`; disable smooth scrolling and minimize transitions.
- Do not introduce autoplay, parallax, cursor effects, or persistent animation without an explicit request.

## Responsive behavior

The design must work from narrow mobile screens through wide desktop screens.

- Desktop: spacious editorial intro, full horizontal event rail, and a three-part detail panel.
- Tablet: preserve the horizontal rail and reduce event card width and surrounding gaps.
- Mobile at approximately 760px and below: stack the intro, keep the event rail horizontally scrollable, place date metadata above the detail, and keep controls easy to reach.
- Reduce padding and headline scale proportionally; do not remove the horizontal interaction on small screens.
- Maintain readable tap targets and preserve the visual hierarchy on small screens.
- Test long event titles, long people lists, empty people arrays, and first/last navigation states.

## Accessibility requirements

- Use semantic landmarks and heading hierarchy.
- The timeline section must have a stable heading `id` and reference it with `aria-labelledby`.
- Timeline event buttons need `role="tab"`, `aria-selected`, and a relationship to the detail panel.
- Previous and next controls need meaningful labels and disabled states at the ends of the data set.
- Keyboard users must be able to move through events with the left and right arrow keys.
- Preserve keyboard navigation and visible focus states.
- Do not rely on color alone to communicate status or interaction.
- Keep decorative symbols and imagery `aria-hidden` when their meaning is already conveyed by adjacent text.
- Maintain sufficient contrast, especially in the navy contact section and coral accents.

## Implementation rules for AI agents

- Inspect the existing component and stylesheet before changing visual behavior.
- Reuse tokens, class names, spacing patterns, and interaction conventions already in `app/globals.css`.
- Prefer a small, local CSS adjustment over a new styling system.
- Keep page content data-driven where the current code is data-driven.
- When changing a reusable component, update its Storybook story or add a relevant variant.
- Verify at mobile and desktop widths after layout changes.
- Run `npm run lint` and `npm run build` when application code or configuration changes.
- If a request conflicts with this document, follow the explicit user request and update this document when the new direction is intended to persist.
