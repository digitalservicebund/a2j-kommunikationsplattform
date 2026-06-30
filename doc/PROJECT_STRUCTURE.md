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
