import VerfahrenSchema from "~/models/VerfahrenSchema";
import { fetchFromApi } from "./fetchFromApi.server";

type FetchVerfahrenByIdOptions = {
  id: string;
};

const errorMessage = "Das Verfahren konnte nicht abgerufen werden.";

export default async function (options: FetchVerfahrenByIdOptions) {
  const url = `/verfahren/${options.id}`;
  const response = await fetchFromApi({ url, errorMessage });
  try {
    return VerfahrenSchema.parse(response);
  } catch (error) {
    throw new Error(errorMessage, { cause: error });
  }
}
