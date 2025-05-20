import prismaClient from "../../prisma";
import { Client } from "@prisma/client"; // Importe Client se precisar do tipo de retorno explícito
import { IFilterCustomerDTO } from "../../interfaces/IFilterCustomerDTO"; // Ajuste o caminho

class ListCustomersService {
  async execute(filters: IFilterCustomerDTO): Promise<Client[]> {
    const {
      id,
      name,
      email,
      minAge,
      maxAge,
      minIncome,
      maxIncome,
    } = filters;

    const whereClause: any = {};

    // Filtro por ID
    if (id) {
      whereClause.id = id;
    }

    // Filtro por nome
    if (name) {
      whereClause.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    // Filtro por email
    if (email) {
      whereClause.email = {
        contains: email,
        mode: 'insensitive',
      };
    }

    // Filtro por idade mínima
    if (minAge !== undefined) {
      if (!whereClause.age) whereClause.age = {};
      whereClause.age.gte = minAge;
    }

    // Filtro por idade máxima
    if (maxAge !== undefined) {
      if (!whereClause.age) whereClause.age = {};
      whereClause.age.lte = maxAge;
    }

    // Filtro por renda mínima
    if (minIncome !== undefined) {
      if (!whereClause.income) whereClause.income = {};
      whereClause.income.gte = minIncome;
    }

    // Filtro por renda máxima
    if (maxIncome !== undefined) {
      if (!whereClause.income) whereClause.income = {};
      whereClause.income.lte = maxIncome;
    }

    // Consulta ao banco de dados com os filtros
    const customers = await prismaClient.client.findMany({
      where: whereClause,
    });

    return customers;
  }
}

export { ListCustomersService };