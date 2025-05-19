import prismaClient from "../../prisma";
import { CreditModality } from '@prisma/client'; 
import { ICreateCreditModalityDTO } from "../../interfaces/ICreateCreditDTO"

class CreateCreditModalityService {
  async execute(data: ICreateCreditModalityDTO): Promise<CreditModality> {
    const {
      name,
      maxTermYears,
      minAge,
      maxAge,
      minIncome,
      maxIncome,
      interestRate,
      interestType,
      adminFeePercentage,
      description,
      isActive, // isActive é opcional na DTO, mas pode ser passado
    } = data;

    // 1. Validação dos campos obrigatórios
    if (!name || !maxTermYears) { // maxTermYears também é obrigatório pelo schema
      throw new Error("Required fields 'name' and 'maxTermYears' must be provided.");
    }

    // 2. Verificar se já existe uma modalidade de crédito com o mesmo nome (que é único)
    const existingModality = await prismaClient.creditModality.findUnique({
      where: {
        name: name,
      },
    });

    if (existingModality) {
      throw new Error(`Credit modality with name "${name}" already exists.`);
    }

    // 3. Adicionar validações de negócio adicionais (exemplos):
    if (minAge !== undefined && maxAge !== undefined && minAge > maxAge) {
      throw new Error("Minimum age cannot be greater than maximum age.");
    }
    if (minIncome !== undefined && maxIncome !== undefined && minIncome > maxIncome) {
      throw new Error("Minimum income cannot be greater than maximum income.");
    }
    if (interestRate !== undefined && (interestRate < 0 || interestRate > 1)) { // Assumindo taxa como decimal ex: 0.05 para 5%
        throw new Error("Interest rate must be a value between 0 and 1 (e.g., 0.075 for 7.5%).");
    }
    if (maxTermYears <= 0) {
        throw new Error("Maximum term in years must be a positive number.");
    }

    // 4. Criar a nova modalidade de crédito no banco de dados
    // O Prisma vai usar o valor default para isActive (true) se não for fornecido.
    // Campos como id, createdAt, updatedAt são gerenciados pelo Prisma.
    const newCreditModality = await prismaClient.creditModality.create({
      data: {
        name,
        maxTermYears,
        minAge,             // Será undefined se não fornecido, e o Prisma lidará com isso (campo opcional)
        maxAge,
        minIncome,
        maxIncome,
        interestRate,
        interestType,
        adminFeePercentage,
        description,
        isActive,           // Se isActive for undefined na DTO, o default do Prisma (true) será usado
      },
    });

    return newCreditModality;
  }
}

export { CreateCreditModalityService };