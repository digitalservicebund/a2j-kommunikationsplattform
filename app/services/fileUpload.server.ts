import { LocalFileStorage } from "@mjackson/file-storage/local";
import { type FileUpload, parseFormData } from "@mjackson/form-data-parser";
import { randomUUID } from "node:crypto";
import { config } from "~/config/config.server";

const fileStorage = new LocalFileStorage(config().FILE_UPLOAD_DIRECTORY);

export async function getFormDataFromRequest(
  request: Request,
): Promise<FormData> {
  const uploadHandler = async (fileUpload: FileUpload) => {
    const storageKey = randomUUID();
    await fileStorage.set(storageKey, fileUpload);
    return fileStorage.get(storageKey);
  };
  return await parseFormData(request, uploadHandler);
}
