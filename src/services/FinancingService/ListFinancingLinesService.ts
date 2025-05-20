// src/services/FinancingService/ListFinancingLinesService.ts
import prismaClient from "../../prisma";
import { FinancingLine } from '@prisma/client';
import { IFilterFinancingLineDTO } from "../../interfaces/IFilterFinancingLineDTO";

class ListFinancingLinesService {
  async execute(filters: IFilterFinancingLineDTO): Promise<FinancingLine[]> {
    const {
      id,
      name,
      propertyType,
      isActive,
      compatibleWithModalityType,
    } = filters;

    const whereClause: any = {};

    if (id !== undefined) {
      whereClause.id = id;
    }

    if (name !== undefined) {
      whereClause.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    if (propertyType !== undefined) {
      whereClause.propertyType = {
        equals: propertyType,
        mode: 'insensitive',
      };
    }

    if (isActive !== undefined) {
      whereClause.isActive = isActive;
    }

    if (compatibleWithModalityType !== undefined) {
      whereClause.NOT = {
        disallowedModalityTypes: {
          has: compatibleWithModalityType,
        },
      };
    }

    const financingLines = await prismaClient.financingLine.findMany({
      where: whereClause,
    });

    return financingLines;
  }
}

export { ListFinancingLinesService };