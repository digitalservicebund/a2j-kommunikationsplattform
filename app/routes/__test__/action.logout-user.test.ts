import { it } from "vitest";
import { action, LogoutType } from "../action.logout-user";

describe("/action/logout-user route", () => {
  it("redirects with auto-logged-out status URL params on auto logout", async () => {
    const formData = new FormData();
    formData.append("logoutType", LogoutType.Automatic);

    const options = {
      method: "POST",
      body: formData,
    };

    const request = new Request(
      "http://localhost:3000/action/logout-user",
      options,
    );

    const response = await action({
      request,
      params: {},
      context: {},
    });

    expect(response.status).toBe(302);
    expect(response.headers.get("Location")).toBe("/?status=auto-logged-out");
  });

  it("redirects with logged-out status URL params on logout by user", async () => {
    const formData = new FormData();
    formData.append("logoutType", LogoutType.ByUser);

    const options = {
      method: "POST",
      body: formData,
    };

    const request = new Request(
      "http://localhost:3000/action/logout-user",
      options,
    );

    const response = await action({
      request,
      params: {},
      context: {},
    });

    expect(response.status).toBe(302);
    expect(response.headers.get("Location")).toBe("/?status=logged-out");
  });
});
