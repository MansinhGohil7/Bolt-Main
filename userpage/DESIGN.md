---
name: Architectural Precision
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c2c6d8'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8c90a1'
  outline-variant: '#424655'
  surface-tint: '#b0c6ff'
  primary: '#b0c6ff'
  on-primary: '#002d6f'
  primary-container: '#568dff'
  on-primary-container: '#002661'
  inverse-primary: '#0058cb'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#ffb599'
  on-tertiary: '#5a1c00'
  tertiary-container: '#f36420'
  on-tertiary-container: '#4f1700'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d9e2ff'
  primary-fixed-dim: '#b0c6ff'
  on-primary-fixed: '#001945'
  on-primary-fixed-variant: '#00429c'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#ffb599'
  on-tertiary-fixed: '#370e00'
  on-tertiary-fixed-variant: '#7f2b00'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.02em
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: '0'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
---

## Brand & Style

This design system embodies a premium, high-fidelity SaaS aesthetic rooted in **Ultra-Minimalism**. The visual narrative is defined by "The Luxury of Space"—utilizing expansive white space to denote sophistication and clarity. The target audience includes C-suite executives and high-end creative professionals who value efficiency and visual silence. 

The emotional response should be one of absolute control and calm. To achieve this, the UI draws from **Modern Architectural** influences: rigid grid alignment, high-contrast typography, and a "less but better" approach to decorative elements. Surfaces are treated as structural planes, emphasizing depth through subtle layering rather than overt ornamentation.

## Colors

The palette is anchored in a monochromatic "Midnight" spectrum to maintain a cinematic, high-end feel.

- **Primary (Electric Blue):** Reserved strictly for high-priority calls to action, active states, and critical progress indicators. It serves as a visual "laser" within the dark interface.
- **Surface Tiers:** 
  - Base: `#121212` for the main canvas.
  - Elevated: `#1E1E1E` for cards, modals, and navigation sidebars.
- **Typography & Accents:** Stark white (`#FFFFFF`) is used for primary headings to ensure maximum readability, while varying opacities of white (70%, 40%) handle secondary and tertiary text.
- **Borders:** A refined `#2E2E2E` is used for thin, 1px structural strokes to define boundaries without adding visual weight.

## Typography

This design system utilizes **Inter** exclusively to leverage its systematic, neutral, and highly legible qualities. 

- **Weight Strategy:** Use `SemiBold (600)` for primary headings to create a strong focal point against the dark background. `Medium (500)` is reserved for interactive labels and subheaders.
- **Tight Kerning:** Large display type must use negative letter-spacing (`-0.04em`) to achieve that "Behance-trending" editorial look.
- **Hierarchy:** Contrast is created via scale and opacity rather than varying font families. Secondary body text should be set at 70% opacity white to maintain clear information architecture.

## Layout & Spacing

The layout philosophy follows a **Fixed-Fluid Hybrid Grid**. Content is contained within a 1440px max-width container, centered on the viewport.

- **The 8pt Grid:** All spatial relationships (padding, margin, heights) must be multiples of 8px to ensure mathematical harmony.
- **Horizontal Rhythm:** Use a 12-column grid for desktop with a generous 24px gutter. For high-end "hero" sections, use intentional offsets (e.g., content spanning columns 3 through 10) to create asymmetrical balance.
- **Whitespace:** Elements should be given "room to breathe." Vertical section spacing should default to 128px or 160px on desktop to signal premium quality.

## Elevation & Depth

Depth is communicated through **Tonal Layering** and **Ambient Shadows**, avoiding heavy skeuomorphism.

- **Surfaces:** Use `#1E1E1E` for components that sit above the base layer. 
- **Shadows:** Apply ultra-diffused, "long" shadows for modals. Example: `0px 24px 48px rgba(0, 0, 0, 0.5)`. Shadows should feel like a soft glow of darkness rather than a hard drop shadow.
- **Outlines:** All containers should utilize a 1px solid border (`#2E2E2E`). On hover, these borders may transition to a slightly lighter gray or the Primary Electric Blue to indicate interactivity.

## Shapes

The shape language is **Precision-Softened**. We avoid the playfulness of fully rounded "pill" shapes in favor of professional, geometric rigor.

- **Corner Radii:** Use a consistent 4px (`0.25rem`) radius for buttons, inputs, and small cards. This provides just enough softness to feel modern while maintaining a sharp, engineered appearance.
- **Large Components:** Larger containers like modals or main dashboard cards may scale to 8px (`0.5rem`) to prevent corners from appearing too aggressive at scale.

## Components

- **Buttons:** 
  - *Primary:* Solid Electric Blue (`#0070FF`) with White text. No border.
  - *Secondary:* Transparent background with a 1px White border at 20% opacity.
- **Input Fields:** Minimalist design with only a bottom border (1px) in default state. Transitions to a full 1px outline in Electric Blue on focus. Labels should be small, all-caps `label-md`.
- **Cards:** Use the `#1E1E1E` surface with a 1px `#2E2E2E` border. No shadow in default state; add the ambient shadow only on hover to simulate physical lift.
- **Chips/Badges:** Small, rectangular with 2px radius. Use low-contrast backgrounds (e.g., White at 10% opacity) with White text for a subtle, utilitarian look.
- **Data Tables:** Remove all vertical borders. Use 1px horizontal dividers only. Header text should use the `label-md` style for a technical, precise feel.