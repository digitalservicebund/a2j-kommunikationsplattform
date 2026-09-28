# 9. Adopt common log format and logigng library

## Status

Accepted

## Context

So far, logging has been fragmented and, in places, insecure. Logging is done by calling `console.log` and `console.error` directly, with no common format. This has several downsides:

- Our observability stack (Grafana) is not able to detect the log levels of the app's messages (`info` / `error` / `warning`) as these are missing from most messages. Also, it has no way of recognizing multi-line messages (such as error stack traces) and treats them as separate messages.

- It is not possible to adopt structured (JSON) logs to address these issues as there is no common logging abstraction to implement it these in.

Some of the third-party libraries add their own logging, creating more inconsistency.

Furthermore, parts of the app log access tokens e.g. as part of logging outgoing API requests. While sometimes useful during development, such secrets should be redacted in production.

## Decision

Standardize on [pino](https://getpino.io/) as the logging library to use throughout the app — both on the server and in the browser. `pino` is already present as a transitive dependency of `pino-http`, which we use for request logging, and ships a first-class browser build (no polyfills or bundler configuration needed).

Pino produces structured JSON logs by default, which we will use in our deployment environment. For local development, we will add [pino-pretty](https://github.com/pinojs/pino-pretty) as a dev dependency for a more human-friendly log format. For instance, the following logging statement:

```ts
logger.info({ foo: "bar" }, "An example message");
```

produces a structured log message like this one:

```json
{
  "level": 30,
  "time": 1790586867668,
  "pid": 25227,
  "hostname": "Mac.fritz.box",
  "foo": "bar",
  "msg": "An example message"
}
```

With `pino-pretty`, it looks like this (with additional coloring):

```
[11:13:57.203] INFO (23101): An example message
    foo: "bar"
```

### Redaction

Pino has the ability to redact the values of log message context attributes. We will use this to redact sensible fields such as the `Authorization` and `Cookie` headers of incoming and outgoing requests, solving the issue of secrets being logged in our observability systems.

### Third-Party Library Integration

We will use the custom logging hook provided by Better Auth to route its log messages through our Pino logger. For request logging, we stay with `pino-http` and drop `morgan`, avoiding double logging of requests.

## Consequences

When we adopt new dependencies in the future, we must check if these produce logs and, if yes, whether the logging mechanism can be overridden to use our logger.
