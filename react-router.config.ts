import type { Config } from "@react-router/dev/config";
import { sentryOnBuildEnd } from "@sentry/react-router";

export default {
  ssr: true,
  buildEnd: sentryOnBuildEnd,
  future: {
    v8_middleware: true,
  },
} satisfies Config;
