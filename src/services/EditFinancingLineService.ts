// src/services/EditFinancingLineService.ts
import prismaClient from "../prisma";
import { FinancingLine } from '@prisma/client';
import { IEditFinancingLineDTO } from "../interfaces/IEditFinancingLineDTO";

class EditFinancingLineService {
  async execute(id: string, data: IEditFinancingLineDTO): Promise<FinancingLine> {
    if (Object.keys(data).length === 0) {
      throw new Error("No data provided for update.");
    }

    const existingFinancingLine = await prismaClient.financingLine.findUnique({
      where: { id: id },
    });

    if (!existingFinancingLine) {
      throw new Error("Financing Line not found.");
    }

    if (data.name && data.name !== existingFinancingLine.name) {
      const lineWithNewName = await prismaClient.financingLine.findUnique({
        where: { name: data.name },
      });

      if (lineWithNewName && lineWithNewName.id !== id) {
        throw new Error("Name already in use by another Financing Line.");
      }
    }

    const dataToUpdate: { [key: string]: any } = {};

    if (data.name !== undefined) dataToUpdate.name = data.name;
    if (data.propertyType !== undefined) dataToUpdate.propertyType = data.propertyType;
    if (data.description !== undefined) dataToUpdate.description = data.description;
    if (data.disallowedModalityTypes !== undefined) dataToUpdate.disallowedModalityTypes = data.disallowedModalityTypes;
    if (data.isActive !== undefined) dataToUpdate.isActive = data.isActive;

    if (Object.keys(dataToUpdate).length === 0) {
      return existingFinancingLine;
    }

    const updatedFinancingLine = await prismaClient.financingLine.update({
      where: { id: id },
      data: dataToUpdate,
    });

    return updatedFinancingLine;
  }
}

export { EditFinancingLineService };