import { z } from "zod";
import { clientConfig } from "~/config/config";
import { Route } from "../+types/root";

const { JUSTIZ_BACKEND_API_URL } = clientConfig();

const VerfahrenStatusSchema = z.enum(["Erstellt", "Eingereicht"]);
const VerfahrenSchema = z.object({
  id: z.string().uuid(),
  aktenzeichen: z.string().nullable(),
  status: VerfahrenStatusSchema,
  status_changed: z.string().datetime(),
});

type Verfahren = z.infer<typeof VerfahrenSchema>;

const fetchVerfahrenFromApi = async () => {
  const url = `${JUSTIZ_BACKEND_API_URL}/api/v1/verfahren/?limit=10&offset=0`;

  try {
    const res = await fetch(`${url}`, {
      method: "GET",
      headers: {
        "X-User-ID": "TestId",
        "Content-Type": "application/json",
      },
    });
    const verfahren = await res.json();
    const parsedVerfahren: Verfahren[] = z
      .array(VerfahrenSchema)
      .parse(verfahren);
    return parsedVerfahren;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Zod validation error:", error.errors);
    } else {
      console.error("Error fetching Verfahren:", error);
    }
    throw error;
  }
};

/**
 * @see https://reactrouter.com/how-to/client-data#skip-the-server-hop
 */

// initial data loading on document load (1)
export async function loader() {
  const data = await fetchVerfahrenFromApi();
  return data;
}

export async function clientLoader() {
  const data = await fetchVerfahrenFromApi();
  return data;
}

// HydrateFallback is rendered while the client loader is running
export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function E2eTest({ loaderData }: Route.ComponentProps) {
  console.log("Hi from e2e-test.tsx", loaderData);
  return (
    <div>
      <h1>{JUSTIZ_BACKEND_API_URL}</h1>
      <p>Hello</p>
    </div>
  );
}
