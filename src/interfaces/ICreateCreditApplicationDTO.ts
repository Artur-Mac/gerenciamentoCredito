// src/interfaces/creditApplication/ICreateCreditApplicationDTO.ts
export interface ICreateCreditApplicationDTO {
    clientId: string;
    creditModalityId: string;
    financingLineId: string;
    requestedAmount?: number | null;
    propertyValue?: number | null;
  }