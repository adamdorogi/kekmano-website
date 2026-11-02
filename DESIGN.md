---
name: "Kék Manó"
description: "The trusted local expert's calling card: clear help, real people, immediate contact."
colors:
  blue: "#1559e8"
  blue-hover: "#0844bd"
  navy: "#102c4c"
  text: "#183451"
  muted: "#52667e"
  ice: "#edf5fb"
  ice-strong: "#deedfa"
  line: "#d9e4ed"
  white: "#fff"
  gold: "#eea515"
  cloud: "#f5f9fc"
  field-border: "#becddc"
  field-focus: "#b8d1ff"
  error: "#a12232"
  error-surface: "#fff1f1"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(54px, 6.25vw, 96px)"
    fontWeight: 800
    lineHeight: 1.01
    letterSpacing: "-0.04em"
  page-title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(44px, 5.1vw, 76px)"
    fontWeight: 800
    lineHeight: 1.09
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(30px, 3vw, 46px)"
    fontWeight: 800
    lineHeight: 1.17
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "23px"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  lead:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(18px, 1.45vw, 21px)"
    fontWeight: 400
    lineHeight: 1.7
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 800
    lineHeight: 1.35
  navigation:
    fontFamily: "Manrope, sans-serif"
    fontSize: "15px"
    fontWeight: 800
    lineHeight: 1.65
  field:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  field: "7px"
  inset: "8px"
  control: "10px"
  surface: "14px"
  photo: "16px"
  circle: "50%"
spacing:
  xs: "8px"
  compact: "10px"
  sm: "12px"
  md: "16px"
  body-gap: "20px"
  card: "22px"
  lg: "24px"
  band: "28px"
  panel: "30px"
  heading-gap: "36px"
  column: "40px"
  section-mobile: "58px"
  section-tablet: "76px"
  section: "104px"
  gutter: "clamp(24px, 6.45vw, 100px)"
components:
  button-primary:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.blue-hover}"
  button-secondary:
    backgroundColor: "{colors.ice}"
    textColor: "{colors.navy}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "16px 24px"
  button-secondary-hover:
    backgroundColor: "{colors.ice-strong}"
  text-link:
    textColor: "{colors.blue}"
  field:
    backgroundColor: "{colors.white}"
    textColor: "{colors.text}"
    typography: "{typography.field}"
    rounded: "{rounded.field}"
    padding: "12px 13px"
  navigation:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    typography: "{typography.navigation}"
  service-card:
    backgroundColor: "{colors.ice}"
    rounded: "{rounded.surface}"
  service-title-strip:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.control}"
    padding: "12px 15px"
  review-card:
    backgroundColor: "{colors.white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.surface}"
    padding: "30px 26px 24px"
  quote-form:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.surface}"
    padding: "34px"
  form-error:
    backgroundColor: "{colors.error-surface}"
    textColor: "{colors.error}"
    rounded: "{rounded.field}"
    padding: "14px"
  hours-badge:
    backgroundColor: "{colors.navy}"
    textColor: "{colors.white}"
    rounded: "{rounded.circle}"
    width: "148px"
    height: "156px"
---

# Design System: Kék Manó

## Overview

**Creative North Star: "The trusted local expert's calling card"**

A spacious white ground, sturdy navy lettering, and direct cobalt actions make the business easy to read and contact. Ice-blue bands organize practical information without giving every section a raised container. The tone is capable, familiar, and straightforward.

Real people and working equipment supply the visual character. Preserve the existing Kék Manó mascot and authentic source photographs. The approved white direction supplies the layout language; generated photographic details do not replace the business's own material. Modest corners and short, purposeful movement keep the interface approachable.

**Key Characteristics:**

- White space and ice-blue working surfaces.
- Broad Manrope headlines, navy structure, and cobalt emphasis.
- Authentic source photography and the existing mascot.
- Clear rectangular actions and softly rounded photographic frames.
- Visible telephone access and restrained motion.

This records the completed implementation in `app/globals.css`, `app/layout.tsx`, `components/`, and `lib/site.ts`, checked against the final desktop and mobile captures. The frontmatter is the normative token layer; the sidecar contains state, motion, breakpoint, and rendered-component extensions. Home-page composition remains in `.impeccable/surfaces/app-page-tsx.md`.

## Colors

The palette combines a white and pale-blue ground with legible ink tones and a clear cobalt action color.

### Primary

- **Callable Cobalt** (`blue`): primary telephone and submission actions, linked text, selected navigation, functional icons, and selected headline emphasis.
- **Deep Cobalt** (`blue-hover`): the darker interactive state for cobalt controls.

### Secondary

- **Review Gold** (`gold`): filled review stars. This is evidence color, not an alternative action color.

### Neutral

- **Ink Navy** (`navy`): headings, navigation, the utility bar, availability badge, and the full-width coverage band.
- **Reading Ink** (`text`): the default body and control foreground.
- **Slate Copy** (`muted`): supporting descriptions, captions, helper text, and secondary information.
- **Ice Blue** (`ice`): reassurance bands, service-card bodies, reviews and contact sections, and secondary actions.
- **Pressed Ice** (`ice-strong`): hover treatment for pale secondary controls.
- **Cool Divider** (`line`): table rows, FAQ separators, and footer structure.
- **White** (`white`): page ground, photographic title strips, form panels, review cards, and foreground on dark or cobalt controls.
- **Cloud** (`cloud`): quieter pricing, awards, contact-page, and reference-title backgrounds.
- **Field Stroke** (`field-border`) and **Soft Focus** (`field-focus`): the field boundary and focused field outline.
- **Error Ink** (`error`) and **Error Wash** (`error-surface`): visible form failures. These are semantic feedback colors, not brand accents.

### Named Rules

**The Callable Accent Rule.** Keep the urgent telephone action in solid cobalt and the quote action on a pale surface when they appear together. Reserve gold for review evidence.

## Typography

**Display Font:** Manrope, with a sans-serif fallback.

**Body Font:** Manrope, with a sans-serif fallback.

The site self-hosts the regular, bold, and extra-bold files through `next/font/local` (weights 400, 700, and 800). Its broad, sturdy letterforms carry both confidence and everyday readability. The italic personal signature uses the same family; it does not introduce a script face.

### Hierarchy

- **Display** (`display`): the home headline, with tight leading and tracking. Below the tablet breakpoint it uses `clamp(48px, 6.2vw, 66px)`; on mobile it uses `clamp(44px, 9.9vw, 70px)` with 1.05 leading. The narrowest layout uses 42px.
- **Page title** (`page-title`): the general interior-page heading baseline. Individual service, about, contact, reference, and legal pages tune the scale to their title length.
- **Headline** (`headline`): section headings. Mobile sections use `clamp(29px, 6.6vw, 38px)`; the home service heading is a deliberate compact variation.
- **Title** (`title`): card and subsection headings. Service titles are fluid on desktop and 22px on mobile; longer Hungarian names wrap inside the white strip.
- **Lead** (`lead`): introductory paragraphs. The home introduction has its own larger desktop scale and becomes 17px with comfortable leading on mobile.
- **Body** (`body`): regular descriptive copy. The mobile baseline is 16px; article copy uses a maximum of 72ch and legal copy 76ch.
- **Label** (`label`) and **Navigation** (`navigation`): extra-bold sentence-case action labels and compact navigation. Utility information and form labels are smaller, with bold used to retain hierarchy.
- **Field** (`field`): regular input text on desktop. Mobile text fields and selects use 16px; labels remain separate and smaller.

### Named Rules

**The Broad Sans Rule.** Use the shipped Manrope family for display, body, labels, and the personal signature. Preserve its Hungarian accents and the strong difference between regular copy and extra-bold headings.

## Layout

The shared container is centered and capped at 1340px, with its width calculated from twice the `gutter` token. White and tinted bands can span the viewport while their contents share that alignment. The default section rhythm uses `section`, then `section-tablet`, then `section-mobile`; the home hero, service introduction, utility bands, and interior-page introductions have intentionally tighter spacing.

Desktop layouts pair text and documentary images in roughly balanced columns; explanatory sections pair a narrower introduction with a wider table, FAQ list, or form. Service cards use three columns, or two when presenting related services. Gaps vary with the content rather than forcing an invented universal grid.

Responsive behavior is defined at 1250px, 1050px, 760px, and 374px, with a display-size cap from 1600px. At 1050px the horizontal navigation becomes a menu and the gutter becomes 36px. At 760px the gutter becomes 24px, paired layouts and services stack, the reassurance band becomes rows, video cards become one column, and reference photos retain two columns. Reviews retain a horizontally scrollable next-card preview. At 374px the gutter becomes 19px, paired form rows stack, and home actions can take separate rows.

On mobile, the fixed telephone bar includes the safe-area inset and the footer reserves room for it. Keep the navigation sticky, preserve scroll offset for anchored content, and adapt photo crops and badge position so the real person's face stays visible.

## Elevation & Depth

The system is predominantly flat. White panels on pale-blue bands, restrained dividers, inset photo labels, and the navy coverage band create hierarchy. Service cards, review cards, and form containers do not use resting shadows. Small shadows clarify open navigation, media controls, and persistent mobile access.

### Shadow Vocabulary

- **Primary hover:** `0 8px 20px #1559e824`; a restrained response on the primary action.
- **Service index:** `0 16px 54px #102c4c20`; separates the open service menu from the page.
- **Mobile menu:** `0 20px 26px #102c4c12`; marks the temporary menu plane.
- **Mobile telephone bar:** `0 -5px 24px #102c4c12`; distinguishes the fixed control from scrolling content.
- **Video play control:** `0 8px 30px #061c4170`; keeps the cobalt play action visible on documentary imagery.

### Named Rules

**The Flat Working Surface Rule.** Use tonal contrast and dividers for ordinary content panels. Use the observed shadows for interactive or overlapping layers rather than adding elevation to every card.

## Shapes

Use modest corners in a clear hierarchy: fields are the tightest, inset captions are slightly softer, actions and service-title strips use control corners, content panels share the surface radius, and large documentary frames use the photo radius. Photographs and videos clip cleanly within their frames.

Circles are functional accents: line-icon holders, review initials, round arrow controls, and the bordered availability badge. The availability badge is slightly taller than it is wide. They coexist with rectangular actions; do not turn every container into a capsule.

Service photography has a distinctive inset white title strip near its lower edge. Its top photo corners and lower ice-blue content corners complete one card silhouette. Keep the service description, starting price, and price-details link below the photograph.

## Components

### Buttons

Direct, sturdy, and easy to recognize. The standard action has a 56px minimum height, extra-bold sentence-case label, a 13px icon gap, and the primary or secondary frontmatter assignment. The home hero enlarges the actions; smaller header and form contexts retain their own observed sizing.

Primary hover darkens the background and adds the documented soft shadow. Secondary hover moves from Ice Blue to Pressed Ice. Background and color changes take 0.2s; the last icon moves 3px to the right over 0.35s using the shared easing. Generic keyboard focus is a 3px cobalt outline with 5px offset; the primary action uses a navy outline. Disabled buttons reduce opacity and retain a not-allowed cursor.

### Text links and icon controls

Text actions are extra-bold cobalt with an inline arrow and underline on hover. The arrow shares the short movement used by buttons. Circular icon controls use a pale surface and become a stronger ice tone on hover. Use inline line icons, not text glyph substitutes.

### Service cards

Photographic and practical. The image link uses a desktop aspect ratio of 1.88 and a mobile ratio of 1.95. The white service-title strip is inset 14px from the photo edges and carries a circular arrow. Descriptions and prices remain in the ice-blue body below it, separated by a fine rule. Hover slightly enlarges the image (1.035 over 0.6s) and turns the arrow cobalt with a white icon. Native source-photo quality takes precedence over generated photographic fidelity.

### Review cards

Flat white surfaces on the Ice Blue section, with gold stars, an attributed quotation, a small circular initial, and the source mark. The horizontal track shows three cards on desktop, two at tablet width, and an 85% card width on mobile. Preserve real source quotations and attribution.

### Inputs / Fields

White, lightly stroked controls with separate bold labels, consistent field corners, and a minimum height of 47px. Desktop controls use the `field` typography; mobile inputs and selects increase to 16px. Hover strengthens the stroke; focus uses the cobalt border and a 2px Soft Focus outline with 1px offset. Textareas resize vertically.

The quote panel contains paired short fields, full-width location and message fields, selects, a dashed upload area, consent, and a full-width primary submit action. On mobile the select row stacks; at the narrowest breakpoint all paired rows stack. Upload feedback and form failures stay adjacent to the related controls. The failure panel uses Error Wash and Error Ink and retains telephone and email alternatives. Success feedback is shown only after a confirmed send.

### Navigation

A sticky white navigation row sits below the navy utility bar. Desktop navigation uses extra-bold sentence-case labels; current and expanded states are cobalt. The service index is a native details disclosure: a concise list of services with starting prices, arrows, and a separated price-details link. Its opening uses a short downward reveal, and the chevron rotates. Escape and outside clicks close the index; Escape restores focus.

At tablet width the menu button opens the vertical service index and the remaining destinations. On mobile, a fixed white telephone bar carries the primary action, a short availability line, and an arrow; keep its safe-area spacing and footer clearance.

### FAQ and pricing disclosures

Quiet native details rows with fine Cool Divider rules, a readable question, and a drawn plus that becomes a minus when open. Open FAQ questions become cobalt. Pricing tables use aligned amounts and tabular numerals, with additional conditions behind a similarly restrained disclosure.

### Availability and photo labels

The navy availability badge uses a white border, a clock icon, an extra-bold time value, and small bold supporting lines. On mobile it moves to the right of the portrait to preserve the face. White photo captions identify a person, equipment, or starting price; their contrast comes from the opaque white surface rather than a gradient or text shadow.

Motion uses `cubic-bezier(0.16, 1, 0.3, 1)` for arrow movement, image enlargement, and menu reveal; short color changes use the CSS `ease` curve. Reduced-motion preference removes smooth scrolling and reduces animation and transition durations to 0.01ms with a single iteration.

## Do's and Don'ts

### Do:

- **Do** use the self-hosted Manrope files and the implemented 400, 700, and 800 weights.
- **Do** preserve the original mascot and real source photographs; adjust crops and overlays to keep the person visible.
- **Do** keep the telephone action visually primary and the paired quote action pale and secondary.
- **Do** place service titles in inset white strips inside the photos, with descriptions and prices below.
- **Do** align content to the shared container and use the observed mobile stacking behavior.
- **Do** preserve visible keyboard focus, 16px mobile input text, and reduced-motion behavior.

### Don't:

- **Don't** replace authentic source photographs with generated approximations.
- **Don't** introduce a second display or script family.
- **Don't** add resting shadows to the flat service, review, or quote-form surfaces.
- **Don't** repurpose review gold or error colors as competing primary actions.
- **Don't** obscure the person's face with the availability badge or photo labels.
