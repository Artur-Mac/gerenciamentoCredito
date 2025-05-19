export interface ICreateCreditModalityDTO {
  
  name: string;

  
  maxTermYears: number;

  
  minAge?: number;

  
  maxAge?: number;

  
  minIncome?: number;


  maxIncome?: number;

  
  interestRate?: number;

  interestType?: string;

  
  adminFeePercentage?: number;

  
  description?: string;

  
  isActive?: boolean;
}