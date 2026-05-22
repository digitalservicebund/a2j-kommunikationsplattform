# 5. How the project is structured

Date: 2026-05-22

## Status

Accepted

## Context

In the past, prototyping features and conducting spikes has meant that we haven’t always left the project structure in good order. To date, there are no clear guidelines for the project structure. The purpose of this ADR is to define a project structure that is as minimalist as possible. The structure should offer flexibility while also enabling good scalability.

## Decision

After researching scalable React Router 7 (RR) project structures using Copilot, Gemini, and Google, Domain-Driven Design (DDD) or Feature-Sliced Design (FSD) were consistently recommended, or a combination of both (regardless of whether the focus was on organizing services or, for example, components).

When it comes to the components: Instead of one single large components folder with n\* components (`OneComponent.tsx` next to `AnotherComponent.tsx`), we want to organize our code into a understandable feature- or domain-based folder structure, as soon as it makes sense. So as soon as helpful, we introduce a folder to group related components within one folder. For example, all Verfahren related components are being grouped within the `components/verfahren/**` folder (e.g. `components/verfahren/VerfahrenCounter.tsx`). Single purpose components shall remain within the root components `/components/**` folder (e.g. `/components/AnotherComponent.tsx`).

We will use configuration-based routing over file-system routing[^1].

Based on this, the following project structure was designed:

```sh
app/
│
├── components/                              # Reusable components across domains
│   ├── verfahren/VerfahrenCounter.tsx       # Feature/domain based folder group (e.g. Verfahren)
│   ├── ...
│   ├── hooks/                               # Shared logic
│   ├── ...
│   └── AnotherComponent.tsx                 # Single purpose components
│
├── config/                                  # Shared configuration
│
├── domains/                                 # Business area or feature-focused code
│   ├── ...
│   └── verfahren/                           # Verfahren domain
│
├── middleware/                              # Logic before and after response generation
│
├── routes/
│   ├── _index.tsx                           # Root route at /
│   ├── ...
│   ├── verfahren.neu.tsx                    # Each route has its own file to keep
│   └── verfahren.tsx                        # it as simple as possible for now
│
├── services/                                # Reusable implementations (API, auth, storage)
│   ├── ...
│   ├── api/                                 # API
│   └── translations/                        # translations (only German for now)
│
├── utils/                                   # Utilities
│
├── entry.client.tsx                         # Browser entry point (hydrating markup)
├── entry.server.tsx                         # Server-side entry point (HTTP responses)
├── root.tsx                                 # Root layout (starting point of this app)
├── rootHeaders.ts                           # Central response header configuration
├── routes.ts                                # Central route configuration
└── styles.css                               # Global styles
```

## Consequences

The [project structure](../project-structure.md) will be updated in accordance with the decision introduced by this ADR, and the development of new features will continue in line with the new structure. The project structure should be revised as soon as it becomes unclear or no longer makes sense.

[^1]: React Router Routing docs [https://reactrouter.com/start/framework/routing#configuring-routes](https://reactrouter.com/start/framework/routing#configuring-routes)
