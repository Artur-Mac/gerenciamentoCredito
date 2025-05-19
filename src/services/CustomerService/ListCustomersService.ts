import prismaClient from "../../prisma";

class ListCustomersService {
  async execute() {
    const customers = await prismaClient.client.findMany({
    });

    return customers;
  }
}

export { ListCustomersService };