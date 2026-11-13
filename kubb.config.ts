import { defineConfig } from "kubb/config";
import { pluginFetch } from "@kubb/plugin-fetch";
import { pluginZod, resolverZod } from "@kubb/plugin-zod";
import { camelCase, pascalCase } from "kubb/kit";

const operationNameOverrides: Record<string, string> = {
  verfahrenControllerGetAsync: "getVerfahren",
};

/**
 * Remove references to KomPla API implementation details, such as "Controller"
 * and "Async", from an OpenAPI `operationId` or a name derived from that.
 *
 * @example
 *
 * ```ts
 * stripImplementationDetails("verfahrenControllerGetAsync") === "verfahrenGet"
 * ```
 */
function stripImplementationDetails(name: string) {
  return name.replace(/Controller/, "").replace(/Async/, "");
}

export default defineConfig({
  input: "./api/openapi.json",

  output: {
    path: "./api/generated",
    clean: true,
  },

  plugins: [
    pluginFetch({
      output: { path: "operations" },
      resolver: {
        name(name) {
          return camelCase(stripImplementationDetails(name));
        },
        file: {
          baseName({ name, extname }) {
            return `${this.name(name)}${extname}`;
          },
        },
      },
    }),

    pluginZod({
      output: { path: "schemas" },
      inferred: true,
      guidType: "guid",
      compile: true,
      resolver: {
        name(name) {
          const defaultName = resolverZod.name(name);
          const strippedName = stripImplementationDetails(defaultName);
          // By default, Kubb makes the schema name `lowerCase` and appends
          // "Schema" at the end. Use `PascalCase` without "Schema" instead.
          return pascalCase(strippedName.replace(/Schema$/, ""));
        },
        file: {
          baseName({ name, extname }) {
            return `${camelCase(this.name(name))}${extname}`;
          },
        },
        schema: {
          // Don't add a "Type" suffix to inferred types
          type(name) {
            return this.name(name);
          },
          typeName(name) {
            return this.name(name);
          },
        },
        // response: {
        //   options(node) {
        //     const baseName = pascalCase(
        //       stripImplementationDetails(node.operationId),
        //     );
        //     return `${baseName}Optionss`;
        //   },
        // },
      },
    }),
  ],
});
