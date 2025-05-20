// src/interfaces/IFilterCustomerDTO.ts (REPETINDO A INTERFACE CORRETA PARA FILTROS DE RANGE)
export interface IFilterCustomerDTO {
    id?: string;
    name?: string;
    email?: string;
    minAge?: number;
    maxAge?: number;
    minIncome?: number;
    maxIncome?: number;
}