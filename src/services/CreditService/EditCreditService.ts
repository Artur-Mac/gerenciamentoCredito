// src/services/EditCreditModalityService.ts
import prismaClient from "../../prisma";
import { CreditModality } from '@prisma/client';
import { IEditCreditModalityDTO } from "../../interfaces/IEditCreditDTO";

class EditCreditModalityService {
  async execute(id: string, data: IEditCreditModalityDTO): Promise<CreditModality> {
    if (Object.keys(data).length === 0) {
      throw new Error("No data provided for update.");
    }

    const existingModality = await prismaClient.creditModality.findUnique({
      where: { id: id },
    });

    if (!existingModality) {
      throw new Error("Credit Modality not found.");
    }

    if (data.name && data.name !== existingModality.name) {
      const modalityWithNewName = await prismaClient.creditModality.findUnique({
        where: { name: data.name },
      });

      if (modalityWithNewName && modalityWithNewName.id !== id) {
        throw new Error("Name already in use by another Credit Modality.");
      }
    }

    const dataToUpdate: { [key: string]: any } = {}; // Usando um tipo mais genérico para dataToUpdate

    if (data.name !== undefined) dataToUpdate.name = data.name;
    if (data.minAge !== undefined) dataToUpdate.minAge = data.minAge;
    if (data.maxAge !== undefined) dataToUpdate.maxAge = data.maxAge;
    if (data.minIncome !== undefined) dataToUpdate.minIncome = data.minIncome;
    if (data.maxIncome !== undefined) dataToUpdate.maxIncome = data.maxIncome;
    if (data.interestRate !== undefined) dataToUpdate.interestRate = data.interestRate;
    if (data.interestType !== undefined) dataToUpdate.interestType = data.interestType;
    if (data.maxTermYears !== undefined) dataToUpdate.maxTermYears = data.maxTermYears;
    if (data.adminFeePercentage !== undefined) dataToUpdate.adminFeePercentage = data.adminFeePercentage;
    if (data.description !== undefined) dataToUpdate.description = data.description;
    if (data.isActive !== undefined) dataToUpdate.isActive = data.isActive;

    if (Object.keys(dataToUpdate).length === 0) {
      return existingModality;
    }

    const updatedModality = await prismaClient.creditModality.update({
      where: { id: id },
      data: dataToUpdate,
    });

    return updatedModality;
  }
}

export { EditCreditModalityService };