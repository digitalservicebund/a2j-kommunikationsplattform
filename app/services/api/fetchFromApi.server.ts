import { serverConfig } from "~/config/config.server";

type FetchFromApiOptions = {
  url: string;
  errorMessage: string;
};

// this is a fixed identifier, which will later be replaced by a suitable authentication.
const userId = "PierreM";
const baseUrl = `${serverConfig().JUSTIZ_BACKEND_API_URL}/api/v1`;

export async function fetchFromApi(options: FetchFromApiOptions) {
  const url = `${baseUrl}${options.url}`;
  try {
    const response = await fetch(url, {
      headers: {
        "X-User-ID": userId,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // 4xx and 5xx errors
      throw new Error(options.errorMessage, {
        cause: `Serverantwort war nicht ok (Fehlercode ${response.status} ${response.statusText}).`,
      });
    }

    try {
      return await response.json();
    } catch (error) {
      throw new Error(options.errorMessage, { cause: error });
    }
  } catch (error) {
    // network errors
    throw new Error(options.errorMessage, { cause: error });
  }
}
