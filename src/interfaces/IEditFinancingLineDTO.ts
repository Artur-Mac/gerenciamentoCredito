
export interface IEditFinancingLineDTO {
    name?: string;
    propertyType?: string;
    description?: string | null;
    disallowedModalityTypes?: string[];
    isActive?: boolean;
  }