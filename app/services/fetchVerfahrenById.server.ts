import dummyVerfahrenData from "~/models/dummyVerfahrenData";
import VerfahrenSchema from "~/models/VerfahrenSchema";
import { fetchFromApi } from "./fetchFromApi.server";

type FetchVerfahrenByIdOptions = {
  id: string;
  dummyData?: boolean;
};

const errorMessage = "Das Verfahren konnte nicht abgerufen werden.";

export default async function (options: FetchVerfahrenByIdOptions) {
  if (options.dummyData) {
    return dummyVerfahrenData[0];
  }
  const url = `/verfahren/${options.id}`;
  const response = await fetchFromApi({ url, errorMessage });
  console.log(response);
  try {
    return VerfahrenSchema.parse(response);
  } catch (error) {
    throw new Error(errorMessage, { cause: error });
  }
}
