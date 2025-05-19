import prismaClient from "../prisma";
import { FinancingLine } from '@prisma/client';
import { ICreateFinancingLineDTO } from "../interfaces/ICreateFinancingLineDTO";

class CreateFinancingLineService {
  async execute(data: ICreateFinancingLineDTO): Promise<FinancingLine> {
    if (!data.name || !data.propertyType) {
      throw new Error("Name and Property Type are required.");
    }

    const existingFinancingLine = await prismaClient.financingLine.findUnique({
      where: { name: data.name },
    });

    if (existingFinancingLine) {
      throw new Error("Financing Line with this name already exists.");
    }

    const financingLineData: any = {
      name: data.name,
      propertyType: data.propertyType,
    };

    if (data.description !== undefined) {
      financingLineData.description = data.description;
    }
    if (data.disallowedModalityTypes !== undefined) {
      financingLineData.disallowedModalityTypes = data.disallowedModalityTypes;
    }
    if (data.isActive !== undefined) {
      financingLineData.isActive = data.isActive;
    } else {
      financingLineData.isActive = true; // Default value if not provided
    }

    const newFinancingLine = await prismaClient.financingLine.create({
      data: financingLineData,
    });

    return newFinancingLine;
  }
}

export { CreateFinancingLineService };