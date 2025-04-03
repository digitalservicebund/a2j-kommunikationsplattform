import { config } from "~/config/config.server";
import {
  type JustizBackendService,
  JustizBackendServiceImpl,
  JustizBackendServiceMockImpl,
} from "./justizBackend.server";

class ServicesContext {
  private static justizBackendService: JustizBackendService;
  private static mockedJustizBackendService: JustizBackendService;

  private constructor() {
    // Private constructor to prevent instantiation
  }

  public static getJustizBackendService(
    demoMode: boolean = false,
  ): JustizBackendService {
    if (ServicesContext.isDemoMode(demoMode)) {
      return ServicesContext.initializeMockService();
    }
    return ServicesContext.initializeRealService();
  }

  private static initializeRealService(): JustizBackendService {
    if (!ServicesContext.justizBackendService) {
      ServicesContext.justizBackendService = new JustizBackendServiceImpl(
        config().JUSTIZ_BACKEND_API_URL,
      );
    }
    return ServicesContext.justizBackendService;
  }

  private static initializeMockService(): JustizBackendService {
    if (!ServicesContext.mockedJustizBackendService) {
      ServicesContext.mockedJustizBackendService =
        new JustizBackendServiceMockImpl();
    }
    return ServicesContext.mockedJustizBackendService;
  }

  private static isDemoMode(demoMode: boolean): boolean {
    const nodeEnv = process.env.NODE_ENV;
    return demoMode && (nodeEnv === "staging" || nodeEnv === "development");
  }
}

export { ServicesContext };
