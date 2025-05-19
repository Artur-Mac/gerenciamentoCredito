import prismaClient from "../prisma";

interface ICreateCostumerService {
  name: string;
  email: string;
  age: number; // Adicionado
  income: number; // Adicionado
}

class CreateCostumerService {
  async execute({ name, email, age, income }: ICreateCostumerService) {
    if (!name || !email || !age || !income) {
      throw new Error("Not all fields were filled");
    }

    
    const customerExists = await prismaClient.client.findUnique({
      where: {
        email,
      },
    });

    if (customerExists) {
      throw new Error("Customer already exists");
    }

    
    const customer = await prismaClient.client.create({
      data: {
        name,
        email,
        age, 
        income, 
      },
    });

    return customer;
  }
}

export { CreateCostumerService };