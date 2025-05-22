import { LocalFileStorage } from "@mjackson/file-storage/local";
import { type FileUpload, parseFormData } from "@mjackson/form-data-parser";
import { randomUUID } from "node:crypto";
import { serverConfig } from "~/config/config.server";

const fileStorage = new LocalFileStorage(serverConfig().FILE_UPLOAD_DIRECTORY);
const maxFileSize = 6_000_000_0; // 60MB

export async function getFormDataFromRequest(
  request: Request,
): Promise<FormData> {
  const uploadHandler = async (fileUpload: FileUpload) => {
    const storageKey = randomUUID();
    await fileStorage.set(storageKey, fileUpload);
    return fileStorage.get(storageKey);
  };
  return await parseFormData(request, { maxFileSize }, uploadHandler);
}
