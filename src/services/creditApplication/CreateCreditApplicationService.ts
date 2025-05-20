import prismaClient from "../../prisma";
import { CreditApplication, ApplicationStatus, Client, CreditModality, FinancingLine } from "@prisma/client";
import { ICreateCreditApplicationDTO } from "../../interfaces/ICreateCreditApplicationDTO";

class CreateCreditApplicationService {
  private async validateEntities(
    clientId: string,
    creditModalityId: string,
    financingLineId: string
  ): Promise<{ client: Client; modality: CreditModality; line: FinancingLine }> {
    const client = await prismaClient.client.findUnique({ where: { id: clientId } });
    if (!client) throw new Error("Client not found.");

    const modality = await prismaClient.creditModality.findUnique({ where: { id: creditModalityId } });
    if (!modality) throw new Error("Credit Modality not found.");
    if (!modality.isActive) throw new Error("Credit Modality is not active.");

    const line = await prismaClient.financingLine.findUnique({ where: { id: financingLineId } });
    if (!line) throw new Error("Financing Line not found.");
    if (!line.isActive) throw new Error("Financing Line is not active.");

    return { client, modality, line };
  }

  private checkEligibility(client: Client, modality: CreditModality, line: FinancingLine): void {
    if (modality.minAge !== null && client.age < modality.minAge) {
      throw new Error(`Client age ${client.age} is below modality minimum age of ${modality.minAge}.`);
    }
    if (modality.maxAge !== null && client.age > modality.maxAge) {
      throw new Error(`Client age ${client.age} is above modality maximum age of ${modality.maxAge}.`);
    }
    if (modality.minIncome !== null && client.income < modality.minIncome) {
      throw new Error(`Client income R$${client.income} is below modality minimum income of R$${modality.minIncome}.`);
    }
    if (modality.maxIncome !== null && client.income > modality.maxIncome) {
      throw new Error(`Client income R$${client.income} is above modality maximum income of R$${modality.maxIncome}.`);
    }
    if (modality.interestType && line.disallowedModalityTypes.includes(modality.interestType)) {
      throw new Error(`Modality type '${modality.interestType}' is not allowed for financing line '${line.name}'.`);
    }
  }

  async execute(data: ICreateCreditApplicationDTO): Promise<CreditApplication> {
    const { clientId, creditModalityId, financingLineId, requestedAmount, propertyValue } = data;

    if (!clientId || !creditModalityId || !financingLineId) {
      throw new Error("Client ID, Credit Modality ID, and Financing Line ID are required.");
    }

    const { client, modality, line } = await this.validateEntities(clientId, creditModalityId, financingLineId);
    this.checkEligibility(client, modality, line);

    const creditApplication = await prismaClient.creditApplication.create({
      data: {
        clientId,
        creditModalityId,
        financingLineId,
        requestedAmount: requestedAmount !== undefined ? requestedAmount : null,
        propertyValue: propertyValue !== undefined ? propertyValue : null,
        status: ApplicationStatus.PENDING,
      },
    });
    return creditApplication;
  }
}

export { CreateCreditApplicationService };