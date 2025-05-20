/**
 * @jest-environment node
 */
import { JustizBackendServiceImpl } from "~/services/justizBackend.server";

global.fetch = jest.fn();
const hardcodedUserId = "PierreM";

describe("JustizBackendService", () => {
  const service = new JustizBackendServiceImpl("http://localhost");

  it("should create a Verfahren successfully", async () => {
    const xjustizFileName = `xjustiz_${Date.now()}.xml`;
    const xjustizFileContent = "<xml>content</xml>";
    const xjustizFile = new File([xjustizFileContent], xjustizFileName, {
      type: "text/xml",
    });

    const otherFileName = `file_${Date.now()}.txt`;
    const otherFileContent = "file content";
    const otherFile = new File([otherFileContent], otherFileName, {
      type: "text/plain",
    });

    const mockResponse = {
      id: "123e4567-e89b-12d3-a456-426614174000",
      aktenzeichen: "AZ123456",
      status: "Eingereicht",
      status_changed: new Date().toISOString(),
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const result = await service.createVerfahren(xjustizFile, [otherFile]);

    expect(result).toEqual(mockResponse);
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost/api/v1/verfahren",
      expect.objectContaining({
        method: "POST",
        headers: { "X-User-ID": hardcodedUserId },
        body: expect.any(FormData),
      }),
    );

    const formData = (global.fetch as jest.Mock).mock.calls[0][1]
      .body as FormData;
    expect(formData.get("xjustiz")).toEqual(xjustizFile);
    expect(formData.getAll("files")).toContain(otherFile);
  });
});
