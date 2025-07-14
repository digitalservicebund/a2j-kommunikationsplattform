import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

interface JustizBackendService {
  uploadDocumentFiles(verfahrenId: string, files: File[]): Promise<Dokument[]>;
  createVerfahren(xjustiz: File, files: File[]): Promise<Verfahren>;
  getAllVerfahren(limit: number, offset: number): Promise<Verfahren[]>;
  // this fn is not used at the moment within the Web UI
  getVerfahren(id: string): Promise<Verfahren | undefined>;
  getAkte(verfahrenId: string): Promise<Akte | undefined>;
  getAllDokumente(
    verfahrenId: string,
    aktenteilId: string,
    limit: number,
    offset: number,
  ): Promise<AllDokumenteResponse>;
  getDokumentFile(
    verfahrenId: string,
    dokumentId: string,
  ): Promise<DokumentFile | undefined>;
}

class JustizBackendServiceMockImpl implements JustizBackendService {
  verfahren: Verfahren[] = [];
  akten: Map<string, Akte> = new Map(); // verfahrenId -> akte
  dokumente: Map<string, Dokument[]> = new Map(); // aktenteilId -> dokumente
  dokumentFiles: Map<string, Blob> = new Map(); // dokumentId -> file

  async getAllVerfahren(): Promise<Verfahren[]> {
    return this.verfahren;
  }

  // this endpoint is not used at the moment within the Web UI
  async getVerfahren(id: string): Promise<Verfahren | undefined> {
    return this.verfahren.find((v) => v.id === id);
  }

  async createVerfahren(xjustiz: File, files: File[]): Promise<Verfahren> {
    const mockVerfahren: Verfahren = {
      id: uuidv4(),
      aktenzeichen: "AZ123456",
      status: "Eingereicht",
      status_changed: new Date().toISOString(),
      eingereicht_am: new Date().toISOString(),
      gericht_name: "Amtsgericht Kreuzberg",
    };

    this.verfahren.push(mockVerfahren);

    const mockAkte: Akte = {
      id: uuidv4(),
      aktenzeichen: mockVerfahren.aktenzeichen,
      aktenteile: [
        {
          id: uuidv4(),
          name: "Hauptakte",
          parent_id: null,
        },
        {
          id: uuidv4(),
          name: "Eingänge",
          parent_id: null,
        },
      ],
    };
    this.akten.set(mockVerfahren.id, mockAkte);

    const mockDokumente: Dokument[] = [
      {
        id: uuidv4(),
        name: xjustiz.name,
        dokumentKlasse: "XJustiz",
      },
    ].concat(
      files
        .filter((file) => file.size > 0)
        .map((file) => ({
          id: uuidv4(),
          name: file.name,
          dokumentKlasse: "Anlage",
        })),
    );

    mockDokumente.forEach((dokument) => {
      this.dokumentFiles.set(dokument.id!, new Blob([dokument.name!]));
    });

    this.dokumente.set(mockAkte.aktenteile![0].id!, mockDokumente);

    console.log("Mock: Created Verfahren:", this.verfahren);
    return mockVerfahren;
  }

  async getAkte(verfahrenId: string): Promise<Akte | undefined> {
    return this.akten.get(verfahrenId);
  }

  async getAllDokumente(
    verfahrenId: string,
    aktenteilId: string,
    limit: number,
    offset: number,
  ): Promise<AllDokumenteResponse> {
    const dokumente = this.dokumente.get(aktenteilId) || [];
    const paginatedDokumente = dokumente.slice(offset, offset + limit);
    return {
      verfahren_id: verfahrenId,
      dokumente: paginatedDokumente,
      count: dokumente.length,
    };
  }

  async getDokumentFile(
    verfahrenId: string,
    dokumentId: string,
  ): Promise<DokumentFile | undefined> {
    const blob = this.dokumentFiles.get(dokumentId);
    const fileName =
      this.dokumente.get(verfahrenId)?.find((d) => d.id === dokumentId)?.name ||
      "dokument.pdf";
    if (blob) {
      return { file: blob, fileName };
    }
    return undefined;
  }

  // eslint-disable-next-line
  uploadDocumentFiles(verfahrenId: string, files: File[]): Promise<any> {
    const verfahren = this.verfahren.find((v) => v.id === verfahrenId);
    const akte = this.akten.get(verfahrenId);

    if (!akte) {
      throw new Error("Akte not found");
    }

    if (!verfahren) {
      throw new Error("Verfahren not found");
    }

    const eingangsOrdner = akte?.aktenteile?.find((a) => a.name === "Eingänge");
    if (!eingangsOrdner) {
      throw new Error("Eingänge folder not found");
    }

    files.forEach((file) => {
      const dokumentId = uuidv4();
      this.dokumentFiles.set(dokumentId, new Blob([file]));
      const dokument: Dokument = {
        id: dokumentId,
        name: file.name,
        dokumentKlasse: "Anlage",
      };
      const dokumente = this.dokumente.get(eingangsOrdner.id!) || [];
      dokumente.push(dokument);
      this.dokumente.set(eingangsOrdner.id!, dokumente);
    });
    console.log("Mock: Uploaded document files successfully");
    return Promise.resolve();
  }
}

class JustizBackendServiceImpl implements JustizBackendService {
  private hardcodedUserId: string = "PierreM"; // TODO: Get the SAFE-ID from the session and set it as the X-User-ID
  private baseUrl: string;

  constructor(url: string = "https://kompla.sinc.de") {
    this.baseUrl = url;
  }

  // this endpoint is not used at the moment within the Web UI
  async getVerfahren(id: string): Promise<Verfahren | undefined> {
    const url = `${this.baseUrl}/api/v1/verfahren/${id}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-User-ID": this.hardcodedUserId,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 404) {
        console.log("Verfahren not found: ", id);
        return undefined;
      }

      if (!response.ok) {
        const error = "Failed to fetch Verfahren: ";
        handleErrorResponse(response, error);
        throw new Error(error);
      }

      const body = await response.json();

      console.log("body", body);
      const parsedVerfahren: Verfahren = VerfahrenSchema.parse(body);

      console.log("Fetched Verfahren successfully:", parsedVerfahren);
      return parsedVerfahren;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle zod validation errors
        console.error("Zod validation error:", error.errors);
      } else {
        console.error("Error fetching Verfahren:", error);
      }
      throw error;
    }
  }

  async getAllVerfahren(limit: number, offset: number): Promise<Verfahren[]> {
    const url = `${this.baseUrl}/api/v1/verfahren?limit=${limit}&offset=${offset}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-User-ID": this.hardcodedUserId,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = "Failed to fetch all Verfahren: ";
        handleErrorResponse(response, error);
        throw new Error(error);
      }

      const body = await response.json();
      const parsedVerfahren = VerfahrenResponseSchema.parse(body);
      console.log("Fetched all Verfahren successfully:", parsedVerfahren);

      return parsedVerfahren.verfahren;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle zod validation errors
        console.error("Zod validation error:", error.errors);
      } else {
        console.error("Error fetching Verfahren:", error);
      }
      throw error;
    }
  }

  async createVerfahren(xjustiz: File, files: File[]): Promise<Verfahren> {
    const url = `${this.baseUrl}/api/v1/verfahren`;

    const formData = new FormData();

    formData.append("xjustiz", xjustiz);
    files.forEach((file) => formData.append("files", file));

    // TODO: Get the SAFE-ID from the session and set it as the X-User-ID
    const headers = {
      "X-User-ID": this.hardcodedUserId,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: formData,
      });

      if (!response.ok) {
        const error = "Failed to create Verfahren: ";
        handleErrorResponse(response, error);
        throw new Error(error);
      }

      const data = await response.json();
      const parsedVerfahren: Verfahren = VerfahrenSchema.parse(data);

      console.log("Verfahren created successfully:", parsedVerfahren);
      return parsedVerfahren;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle zod validation errors
        console.error("Zod validation error:", error.errors);
      } else {
        console.error("Error creating Verfahren:", error);
      }
      throw error;
    }
  }

  async getAkte(verfahrenId: string): Promise<Akte | undefined> {
    const url = `${this.baseUrl}/api/v1/verfahren/${verfahrenId}/akte`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-User-ID": this.hardcodedUserId,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 404) {
        console.log("Akte not found for verfahren: ", verfahrenId);
        return undefined;
      }

      if (!response.ok) {
        const error = "Failed to fetch Akte: ";
        handleErrorResponse(response, error);
        throw new Error(error);
      }

      const body = await response.json();
      const parsedAkte: Akte = AkteSchema.parse(body);

      console.log("Fetched Akte successfully:", parsedAkte);
      return parsedAkte;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle zod validation errors
        console.error("Zod validation error:", error.errors);
      } else {
        console.error("Error fetching Akte:", error);
      }
      throw error;
    }
  }

  async getAllDokumente(
    verfahrenId: string,
    aktenteilId: string,
    limit: number,
    offset: number,
  ): Promise<AllDokumenteResponse> {
    const url = `${this.baseUrl}/api/v1/verfahren/${verfahrenId}/akte/${aktenteilId}/dokumente?limit=${limit}&offset=${offset}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-User-ID": this.hardcodedUserId,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 404) {
        console.log("Dokumente not found for aktenteil: ", aktenteilId);
        return { verfahren_id: verfahrenId, dokumente: [], count: 0 };
      }

      if (!response.ok) {
        const error = "Failed to fetch Dokumente: ";
        handleErrorResponse(response, error);
        throw new Error(error);
      }

      const body = await response.json();
      const parsedDokumentResponse: AllDokumenteResponse =
        AllDokumenteResponseSchema.parse(body);

      console.log("Fetched Dokumente successfully:", parsedDokumentResponse);
      return parsedDokumentResponse;
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle zod validation errors
        console.error("Zod validation error:", error.errors);
      } else {
        console.error("Error fetching Dokumente:", error);
      }
      throw error;
    }
  }

  async getDokumentFile(
    verfahrenId: string,
    dokumentId: string,
  ): Promise<DokumentFile | undefined> {
    const url = `${this.baseUrl}/api/v1/verfahren/${verfahrenId}/akte/dokumente/${dokumentId}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-User-ID": this.hardcodedUserId,
        },
      });

      if (response.status === 404) {
        console.log("Dokument not found: ", dokumentId);
        return undefined;
      }

      if (!response.ok) {
        const error = "Failed to fetch Dokument file";
        handleErrorResponse(response, error);
        throw new Error(error);
      }

      const contentDisposition = response.headers.get("Content-Disposition");

      let fileName = "dokument.pdf";

      if (contentDisposition) {
        const fileNameMatch = contentDisposition.match(/filename="([^"]+)"/);
        const fileNameStarMatch = contentDisposition.match(
          /filename\*=UTF-8''([^;]+)/,
        );

        if (fileNameStarMatch) {
          fileName = decodeURIComponent(fileNameStarMatch[1]);
        } else if (fileNameMatch) {
          fileName = fileNameMatch[1];
        }
      }

      const file = await response.blob();

      console.log("Fetched Dokument file successfully:", file);
      return { file, fileName };
    } catch (error) {
      console.error("Error fetching Dokument file:", error);
      throw error;
    }
  }

  async uploadDocumentFiles(
    verfahrenId: string,
    files: File[],
  ): Promise<Dokument[]> {
    const url = `${this.baseUrl}/api/v1/verfahren/${verfahrenId}/dokumente`;

    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const headers = {
      "X-User-ID": this.hardcodedUserId,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: formData,
      });

      if (!response.ok) {
        const error = "Failed to upload document files: ";
        handleErrorResponse(response, error);
        throw new Error(error);
      }

      const data = await response.json();
      const parsedDocuments: Dokument[] = z.array(DokumentSchema).parse(data);

      console.log(
        "Uploaded document files successfully",
        JSON.stringify(parsedDocuments),
      );

      return parsedDocuments;
    } catch (error) {
      console.error("Error uploading document files:", error);
      throw error;
    }
  }
}

async function handleErrorResponse(
  response: Response,
  errorMessage: string,
): Promise<string> {
  const reader = response.body?.getReader();
  if (reader) {
    const { value } = await reader.read();
    const decoder = new TextDecoder();
    const decodedText = decoder.decode(value); // Decodes the Uint8Array to a string
    console.error(`${response.status}: ${errorMessage}: `, decodedText);
    return decodedText;
  }
  console.error(`${response.status}: ${errorMessage}: `);
  return errorMessage;
}

const VerfahrenStatusSchema = z.enum(["Erstellt", "Eingereicht"]);

const VerfahrenSchema = z.object({
  id: z.string().uuid(),
  aktenzeichen: z.string().nullable(),
  status: VerfahrenStatusSchema,
  status_changed: z.string().datetime(),
  eingereicht_am: z.string().datetime(),
  gericht_name: z.string(),
});

const VerfahrenResponseSchema = z.object({
  verfahren: z.array(VerfahrenSchema),
});

const AkteSchema = z.object({
  id: z.string().uuid(),
  aktenzeichen: z.string().nullable(),
  aktenteile: z
    .array(
      z.object({
        id: z.string().nullable(),
        name: z.string().nullable(),
        parent_id: z.string().nullable(),
      }),
    )
    .nullable(),
});

const DokumentSchema = z
  .object({
    id: z.string().nullable(),
    name: z.string().nullable(),
    dokument_klasse: z.string().nullable(),
  })
  .transform(({ dokument_klasse, ...rest }) => ({
    ...rest,
    dokumentKlasse: dokument_klasse,
  }));

const AllDokumenteResponseSchema = z.object({
  verfahren_id: z.string().nullable(),
  dokumente: z.array(DokumentSchema).nullable(),
  count: z.number().int(),
});

type DokumentFile = { file: Blob; fileName: string };

type Dokument = z.infer<typeof DokumentSchema>;
type AllDokumenteResponse = z.infer<typeof AllDokumenteResponseSchema>;

type Akte = z.infer<typeof AkteSchema>;
type Verfahren = z.infer<typeof VerfahrenSchema>;

export { JustizBackendServiceImpl, JustizBackendServiceMockImpl };
export type { JustizBackendService };
