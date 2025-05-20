import axios from 'axios';

// Tipos definidos diretamente neste arquivo
export type CreditModality = {
  id: string;
  name: string;
  minAge?: number | null;
  maxAge?: number | null;
  minIncome?: number | null;
  maxIncome?: number | null;
  interestRate?: number | null;
  interestType?: string | null;
  maxTermYears: number;
  adminFeePercentage?: number | null;
  description?: string | null;
  isActive: boolean;
};

export type FinancingLine = {
  id: string;
  name: string;
  propertyType: string;
  description?: string | null;
  disallowedModalityTypes: string[];
  isActive: boolean;
};

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
});

export const fetchCreditModalities = async (): Promise<CreditModality[]> => {
  try {
    console.log("Fetching /listcredits from API...");
    
    const response = await apiClient.get<CreditModality[]>('/listcredits'); 
    console.log("API Response for /listcredits (response.data):", response.data);

  
    if (!Array.isArray(response.data)) {
        console.error("API did not return an array for /listcredits. Response:", response.data);

        return []; 
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching credit modalities:", error);
    throw error; 
  }
};

export const fetchFinancingLines = async (): Promise<FinancingLine[]> => {
   try {
    console.log("Fetching /financinglines from API...");
    const response = await apiClient.get<FinancingLine[]>('/financinglines');
    console.log("API Response for /financinglines (response.data):", response.data);

    if (!Array.isArray(response.data)) {
        console.error("API did not return an array for /financinglines. Response:", response.data);
        return [];
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching financing lines:", error);
    throw error;
  }
};