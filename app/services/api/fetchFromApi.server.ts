type FetchFromApiOptions = {
  url: string;
  errorMessage: string;
};

const userId = "PierreM";
const baseUrl = "https://kompla.sinc.de/api/v1";

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
      return response.json();
    } catch (error) {
      throw new Error(options.errorMessage, { cause: error });
    }
  } catch (error) {
    // network errors
    throw new Error(options.errorMessage, { cause: error });
  }
}
