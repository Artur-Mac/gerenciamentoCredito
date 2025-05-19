import prismaClient from "../prisma";

interface IFilterCreditService {
  minAge?: number;
  maxAge?: number;
  minIncome?: number;
  maxIncome?: number;
  interestType?: string;
  maxTermYears?: number;
  isActive?: boolean;
}

class ListCreditService {
    async execute(filters: IFilterCreditService) {
      const {
        minAge,
        maxAge,
        minIncome,
        maxIncome,
        interestType,
        maxTermYears,
        isActive,
      } = filters;
  
      
      const creditModalities = await prismaClient.creditModality.findMany({
        where: {
          
          minAge: minAge !== undefined ? { gte: minAge } : undefined,
          
          maxAge: maxAge !== undefined ? { lte: maxAge } : undefined,
          
          minIncome: minIncome !== undefined ? { gte: minIncome } : undefined,
          
          maxIncome: maxIncome !== undefined ? { lte: maxIncome } : undefined,
          
          interestType: interestType ? { equals: interestType } : undefined,
          
          maxTermYears: maxTermYears !== undefined ? { lte: maxTermYears } : undefined,
          
          isActive: isActive !== undefined ? { equals: isActive } : undefined,
        },
      });
  
      return creditModalities;
    }
  }

export { ListCreditService };