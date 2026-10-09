import { GerichtInformation } from "~/domains/verfahren/infrastructure/schemas/gerichtInformation.schema";

export function makeGerichtInformation(
  params?: Partial<GerichtInformation>,
): GerichtInformation {
  return {
    bankverbindungen: [
      {
        iban: "DE16 2500 0000 0025 0015 30",
        bank: "Deutsche Bundesbank",
        bic: "MARKDEF1250",
        kontoinhaber: "Amtsgericht Bremen",
      },
    ],
    ...params,
  };
}
