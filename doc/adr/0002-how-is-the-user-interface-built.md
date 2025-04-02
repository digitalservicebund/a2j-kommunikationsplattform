# 2. How is the user interface built

Date: 2025-03-21

## Status

Accepted

## Context

The issue motivating this decision, and any context that influences or constrains the decision.

Within the next 12 months we need to create a user interface (UI) that enables testing of a communication platform in online civil court proceedings. The scope of the MVP is clear from a functional perspective, but the user flow and its look and feel (design) is and will be work in progress for the weeks ahead. It will adjust iteratively. For example after doing a technical spike or user testing/interviews or an option that may seem promising for our roadmap. It is therefore important to be able to react flexibly to future user interface (product) requirements.
In order to be able to start development soon and gather initial findings at an early stage, we have various options with regard to the UI development:

- A2J - Digitale Rechtsantragstelle [Components](https://github.com/digitalservicebund/a2j-rechtsantragstelle/tree/main/app/components)
  - :heavy_exclamation_mark: Copy/paste/adjust and new components need to be created from scratch
- Style-free (or headless) component library options:
  - [React Aria Components](https://react-spectrum.adobe.com/react-aria/components.html)
    - :white_check_mark: Tailwind support
  - [Radix UI Primitives](https://www.radix-ui.com/primitives)
    - :heavy_exclamation_mark: Tailwind is not encouraged
- Other component library options that come already with styles:
  - [KERN UX](https://www.kern-ux.de/)
    - :bangbang: Non customizable design system with a lot of instantly usable components
  - [Material 3](https://m3.material.io/)
    - :white_check_mark: A full customizable design system with a Figma Kit (also good for our design colleagues to get quickly started)

## Decision

The change that we're proposing or have agreed to implement.

## Consequences

What becomes easier or more difficult to do and any risks introduced by the change that will need to be mitigated.
