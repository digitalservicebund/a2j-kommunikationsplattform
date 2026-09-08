import { ValidationProblemDetails } from "~/utils/problemDetails.schema";

export class ApiError extends Error {
  readonly status: number;
  readonly problemDetails: ValidationProblemDetails | undefined;

  constructor(
    message: string,
    options: {
      status: number;
      problemDetails?: ValidationProblemDetails;
      cause?: unknown;
    },
  ) {
    super(message, { cause: options.cause });
    this.name = "ApiError";
    this.status = options.status;
    this.problemDetails = options.problemDetails;
  }
}
