export interface ICreateFinancingLineDTO {
    name: string;
    propertyType: string;
    description?: string | null;
    disallowedModalityTypes?: string[];
    isActive?: boolean;
  }