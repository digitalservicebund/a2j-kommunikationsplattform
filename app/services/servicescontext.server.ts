import type { JustizBackendService } from "./justizbackend.server";
import { JustizBackendServiceMockImpl } from "./justizbackend.server";

class ServicesContext {
  private static justizBackendService: JustizBackendService;

  private constructor() {
    // Private constructor to prevent instantiation
  }

  public static getJustizBackendService(): JustizBackendService {
    if (!ServicesContext.justizBackendService) {
      ServicesContext.justizBackendService = new JustizBackendServiceMockImpl();
    }
    return ServicesContext.justizBackendService;
  }
}

// Usage
const justizBackendService = ServicesContext.getJustizBackendService();

export { ServicesContext, justizBackendService };
