export type E2ETestConfig = {
  baseURL: string;
  basicAuth: {
    username: string;
    password: string;
  };
  testUser: {
    name: string;
    komPlaIdpUsername: string;
    komPlaIdpPassword: string;
  };
};

function configValue(key: string, defaultValue?: string): string {
  const value = process.env[key]?.trim();
  if (value) {
    return value;
  } else if (defaultValue !== undefined) {
    return defaultValue;
  } else {
    throw new Error(`Required environment variable '${key}' is not set`);
  }
}

export default function e2eTestConfig(): E2ETestConfig {
  return {
    baseURL: configValue("E2E_TEST_BASE_URL", "http://localhost:3000"),
    basicAuth: {
      username: configValue("HTTP_CREDENTIALS_USERNAME", ""),
      password: configValue("HTTP_CREDENTIALS_PASSWORD", ""),
    },
    testUser: {
      name: configValue("E2E_TEST_USER_NAME"),
      komPlaIdpUsername: configValue("E2E_TEST_USER_KOMPLA_IDP_USERNAME"),
      komPlaIdpPassword: configValue("E2E_TEST_USER_KOMPLA_IDP_PASSWORD"),
    },
  };
}
