import type { ActionFunctionArgs } from "@remix-run/node";
import { getFilesFromMultipartFormData } from "~/services/fileupload.server";

export async function action({ request }: ActionFunctionArgs) {
  const files = getFilesFromMultipartFormData(request);
  // Validate the XML against the corresponding XJustix xsd schema
  // Call the /verfahren endpoint in the Justiz-Backend-API, reusing the same formData from the req to create a new Verfahren
  // Return the created verfahren_id
  return {
    verfahren_id: "verfahren",
  };
}
