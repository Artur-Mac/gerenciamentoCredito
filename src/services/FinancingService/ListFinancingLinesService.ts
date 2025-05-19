
import prismaClient from "../../prisma";
import { FinancingLine } from '@prisma/client';

class ListFinancingLinesService {
  async execute(): Promise<FinancingLine[]> {
    const financingLines = await prismaClient.financingLine.findMany();

    if (!financingLines || financingLines.length === 0) {
      
      return [];
    }

    return financingLines;
  }
}

export { ListFinancingLinesService };