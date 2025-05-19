// src/services/EditCustomerService.ts
import prismaClient from "../../prisma";
import { Client } from '@prisma/client'; // Importe o tipo Client do Prisma
import { IEditCustomerDTO } from "../../interfaces/IEditCustomerDTO";


class EditCustomerService {
  async execute(id: string, data: IEditCustomerDTO): Promise<Client> {
    // 1. Verificar se algum dado foi fornecido para atualização
    if (Object.keys(data).length === 0) {
      throw new Error("No data provided for update.");
    }

    // 2. Buscar o cliente existente pelo ID
    const existingCustomer = await prismaClient.client.findUnique({
      where: { id: id },
    });

    if (!existingCustomer) {
      throw new Error("Customer not found.");
    }

    // 3. Tratar a atualização do e-mail (se fornecido e diferente do atual)
    if (data.email && data.email !== existingCustomer.email) {
      const customerWithNewEmail = await prismaClient.client.findUnique({
        where: { email: data.email },
      });

      // Se o novo e-mail já existe E pertence a um cliente DIFERENTE do que estamos editando
      if (customerWithNewEmail && customerWithNewEmail.id !== id) {
        throw new Error("Email already in use by another customer.");
      }
    }

    // 4. Preparar os dados para atualização
    // O Prisma ignora campos 'undefined', então podemos passar o objeto 'data'
    // diretamente se IEditCustomerDTO contiver apenas campos válidos do modelo Client.
    // Para maior segurança ou se 'data' puder ter chaves extras, construa 'dataToUpdate' seletivamente.
    const dataToUpdate: Partial<Client> = {};
    if (data.name !== undefined) dataToUpdate.name = data.name;
    if (data.email !== undefined) dataToUpdate.email = data.email;
    if (data.age !== undefined) dataToUpdate.age = data.age;
    if (data.income !== undefined) dataToUpdate.income = data.income;
    // O campo 'updatedAt' (se existir no seu modelo Client com @updatedAt) será atualizado automaticamente pelo Prisma.

    // Se, após a filtragem, não houver dados válidos (caso raro se o primeiro check já existe)
    if (Object.keys(dataToUpdate).length === 0) {
        // Poderia retornar o cliente existente ou lançar um erro mais específico
        console.warn("No valid fields to update after processing. Returning existing customer.");
        return existingCustomer;
    }


    // 5. Realizar a atualização no banco de dados
    const updatedCustomer = await prismaClient.client.update({
      where: { id: id },
      data: dataToUpdate, // Passa apenas os campos que foram fornecidos e são válidos
    });

    return updatedCustomer;
  }
}

export { EditCustomerService };