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
    if (demoMode && ServicesContext.isDemoModeAllowed()) {
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

  static isDemoModeAllowed(): boolean {
    const environment = process.env.ENVIRONMENT;
    return environment === "staging" || environment === "development";
  }
}

export { ServicesContext };
