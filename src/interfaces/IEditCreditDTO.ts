
export interface IEditCreditModalityDTO {
    name?: string;
    minAge?: number | null;
    maxAge?: number | null;
    minIncome?: number | null;
    maxIncome?: number | null;
    interestRate?: number | null;
    interestType?: string | null;
    maxTermYears?: number;
    adminFeePercentage?: number | null;
    description?: string | null;
    isActive?: boolean;
  }