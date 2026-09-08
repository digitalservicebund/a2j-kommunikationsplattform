# Project structure

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
│       ├── entities/                        # Domain types and business rules
│       ├── services/                        # Pure domain logic (no I/O)
│       ├── application/                     # Use cases orchestrating entities/services
│       └── infrastructure/                  # I/O boundary: api/, repositories/, schemas/
│
├── middleware/                              # Logic before and after response generation
│
├── routes/
│   ├── _index.tsx                           # Root route at /
│   ├── ...
│   ├── verfahren.neu.tsx                    # Each route has its own file; heavier
│   └── verfahren.tsx                        # JSX sections are extracted into
│                                             # components/verfahren/ to keep routes small
│
├── services/                                # Reusable, cross-domain implementations
│   ├── ...                                  # (auth, security, error handling)
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
