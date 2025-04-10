# 2. How is the user interface built

Date: 2025-04-09

## Status

Pending

## Context

Work in progress: The issue motivating this decision, and any context that influences or constrains the decision.

Within the next 12 months we need to create a user interface (UI) that enables testing of a communication platform in online civil court proceedings. The scope of the MVP is clear from a functional perspective, but the user flow and its look and feel (design) is and will be work in progress for the weeks ahead. It will adjust iteratively. For example after doing a technical spike or user testing/interviews or an option that may seem promising for our roadmap. It is therefore important to be able to react flexibly to future user interface (product) requirements.
In order to be able to start development soon and gather initial findings at an early stage, we have various options with regard to the UI development and considered the following:

- [KERN UX](https://www.kern-ux.de/)
- [React Aria](https://react-spectrum.adobe.com/react-aria/components.html)
- [Radix Primitives](https://www.radix-ui.com/primitives)
- A2J - Digitale Rechtsantragstelle [Components](https://github.com/digitalservicebund/a2j-rechtsantragstelle/tree/main/app/components)
- [Material 3](https://m3.material.io/)

|                                                    | KERN UX                  | React Aria  | Radix                | A2J Components    | Material 3 |
| -------------------------------------------------- | ------------------------ | ----------- | -------------------- | ----------------- | ---------- |
| Was tested                                         | yes                      | yes         | yes                  | yes               | no[^1]     |
| Developer experience (DX)                          | good                     | challenging | very good            | ok                | -          |
| Integration type                                   | npm package + copy/paste | npm package | npm package          | copy/paste/adjust | -          |
| Tailwind support                                   | yes                      | yes         | yes (not encouraged) | yes               | -          |
| Good starting point for a shared component library | yes                      | no          | yes                  | yes               | -          |

### Testing notes

#### KERN UX

> The [KERN components](https://www.kern-ux.de/components) (german only at the moment) have been specially developed to optimally support the main public services. Our aim is to make these solutions available on almost all devices and browsers - and preferably without the use of a lot of JavaScript.

- HTML/CSS components have been tested
  - There are also Web Components (WC) available, but its usage within a React project is not always easy. For example: Before React 19 was released, prop passing and event handling (synthetic event system from React vs. custom DOM events for WCs) was not always easy, WC usage needs another evaluation, is another topic.
- Usage: A components HTML can be copy/pasted from its overview to the displayed view/page. See the [Checkbox](https://www.kern-ux.de/components/form-inputs/checkboxes) component for a first impression. [CSS](https://www.kern-ux.de/erste-schritte/entwicklerinnen) can be installed via npm, for example.
- The rendered markup is slim and clean:

  ```html
  <div class="kern-form-check">
    <input
      class="kern-form-check__checkbox"
      id="divers"
      name="geschlecht"
      type="checkbox"
    />
    <label class="kern-form-check__label" for="divers">Divers</label>
  </div>
  ```

- No React components are available.

#### React Aria

> [React Aria](https://react-spectrum.adobe.com/react-aria/getting-started.html) is a library of unstyled React components and hooks that helps you build accessible, high quality UI components for your application or design system.

- React components have been tested, there are [starter kits](https://react-spectrum.adobe.com/react-aria/getting-started.html#starter-kits) with Vanilla or Tailwind CSS support to start your own component library.
- Usage: React components can be imported into a view/page directly via [npm package](https://www.npmjs.com/package/react-aria) imports `import { Select } from "react-aria-components"`. Customized component imports are also possible `import { Checkbox } from "~/components/react-aria/Checkbox"` (with custom Tailwind/CSS classes, for example). Boilerplate code is available within the starter kits, see this [link](https://github.com/digitalservicebund/a2j-kommunikationsplattform/pull/166/files#diff-deae1e21337f415600148dc52180f740ecc6d7ff3a4fe512411051bdef090e7b) for a test implementation of a custom `Checkbox` component, based on Tailwind CSS starter kit.
- It seems that a lot of HTML markup (Components) needs to be reworked to align with our design goals of Angie/KERN UX.
  To give an example, here is the rendered output of a React Aria Checkbox component:

  ```html
  <div>
    <label
      class="flex gap-2 items-center group transition ds-checkbox"
      data-rac=""
    >
      <span
        style="border:0;clip:rect(0 0 0 0);clip-path:inset(50%);height:1px;margin:-1px;overflow:hidden;padding:0;position:absolute;width:1px;white-space:nowrap"
      >
        <input type="checkbox" tabindex="0" title="" />
      </span>
      <div
        class="outline-blue-600 dark:outline-blue-500 forced-colors:outline-[Highlight] outline-offset-2 w-40 h-40 shrink-0 rounded-sm flex items-center justify-center border-2 transition outline-0"
      ></div>
      Divers
    </label>
  </div>
  ```

  This markup can't be used out of the box with Angie DS CSS definitions. The Checkbox relevant stylings, e. g. the `.ds-checkbox+label` CSS styles, take care of the layout of an `<input>` and its related `<label>`. They need to be rendered in a specific order: a `<label>` followed by the Checkboxes `<input>` field. Therefore, a revision of the components is necessary to bring React Aria to a usable state for our needs.

- Additionally: A lot of markup is being rendered to enable the React Aria custom layouts, as you can see above within the HTML example. Or within the rendered custom [Select](https://react-spectrum.adobe.com/react-aria/Select.html) markup. This is not the most minimal approach of rendering a checkbox with a label. However, it is also a way to develop accessible UI, see the [mixed-state Checkbox pattern example](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/examples/checkbox-mixed/) from the ARIA Authoring Practices Guide (AGP) for reference.

#### Radix Primitives

> [Radix Primitives](https://www.radix-ui.com/primitives/docs/overview/introduction) is a low-level UI component library with a focus on accessibility, customization and developer experience. You can use these components either as the base layer of your design system, or adopt them incrementally.

- React components have been tested, its usage is well documented (see [Checkbox](https://www.radix-ui.com/primitives/docs/components/checkbox) documentation, for example) and can be imported via component based packages `npm install @radix-ui/react-checkbox` and `import * as Checkbox from "@radix-ui/react-checkbox"` or as needed from the npm package `npm install radix-ui` (_package is [tree-shakeable](https://www.radix-ui.com/primitives/docs/overview/introduction#incremental-adoption), so you should only ship the components you use_) and `import { Checkbox } from "radix-ui"`.
- Usage: The imported React components can be adjusted as needed if the markup is not suitable, see the [Composition](https://www.radix-ui.com/primitives/docs/guides/composition) documentation for further details. With the `asChild` prop (also part of the Composition docs) one can adjust Radix's functionality onto alternative element types or own React components. Here is a [link](https://github.com/digitalservicebund/a2j-kommunikationsplattform/pull/166/files#diff-16ea3513260055d297cf5c60f1c6081fad810616a19c23b7f8c8649e879e3f8b) to a test implementation of some checkboxes with the `asChild` prop.
- The rendered markup is slim and clean:

  ```html
  <div class="flex mb-20">
    <input
      type="checkbox"
      role="checkbox"
      aria-checked="false"
      data-state="unchecked"
      class="ds-checkbox"
      id="divers"
      value="on"
    /><label for="divers">Divers</label>
  </div>
  ```

- Additionally: Good DX. The first impression in terms of usage and adjustability was great, especially compared to React Aria.

#### A2J Components (RAST/ZOV)

> Within the Access 2 Justice (A2J) space are two other projects, "Digitale Rechtsantragstelle" (RAST) and "Zivilgerichtliches Online-Verfahren" (ZOV), that share a codebase. Within that codebase the engineering teams have already created a lot of components that we could use as well to develop the UI. The components have been developed with a focus on accessibility and have a familiar legal look in terms of our desired layout.

- React components have been tested by a copy/paste and adjust approach. Copied from the related GitHub project [components](https://github.com/digitalservicebund/a2j-rechtsantragstelle/tree/main/app/components) folder.
- Usage: The tested React components (Checkbox related ones) haven't been adjusted in regards to its markup or layout as both are well coded and in sync with the latest DigitalService Design System ([Angie](https://github.com/digitalservicebund/angie)). This also applies to the topic of accessibility.
- It was not easy to use a component instantly, because of imported helper and service functions within the Checkbox component (e.g. `import { useStringField } from "~/services/validation/useStringField"`) that needed to be refactored into a shared utils folder before the `<Checkbox />` component could render.
  - If we decide to use A2J components, we need to refactor such functionalities for its usage within our codebase or a shared component library. For a better understanding of this, please have a look at the test integration [here](https://github.com/digitalservicebund/a2j-kommunikationsplattform/pull/166/files#diff-9074d64f6adde9ac3649cdc155b9345e4183a45a65d810a8a6475235c798725c) and start with the Checkbox related needed imports and comments in regards to the `useStringField()` usage.
  - The Checkbox component could benefit from an optional `onChange` handler, to enable Reacts controlled input option.
- The rendered markup is slim and clean:

  ```html
  <div class="flex mb-20">
    <div class="flex flex-col flex-nowrap">
      <div class="flex items-center">
        <input type="hidden" value="off" name="divers" /><input
          id="divers"
          class="ds-checkbox forced-colors:outline forced-colors:border-[ButtonText] "
          type="checkbox"
          value="on"
        />
      </div>
    </div>
    <label for="divers">Divers</label>
  </div>
  ```

- Additionally: A lot of components could already been used to create a new shared component library within the A2J cosmos.

## Decision

To be defined: The change that we're proposing or have agreed to implement.

## Consequences

To be defined: What becomes easier or more difficult to do and any risks introduced by the change that will need to be mitigated.

[^1]: The design discipline had previously classified this design system as unsuitable for our project.
