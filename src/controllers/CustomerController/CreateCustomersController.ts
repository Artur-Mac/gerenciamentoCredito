import { FastifyRequest, FastifyReply } from "fastify";

import { CreateCostumerService } from "../../services/CustomerService/CreateCustomersService";

class CreateCostumerController {
    
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { name, email, age, income } = request.body as { name: string; email: string; age: number; income: number };
        const costumerService = new CreateCostumerService();
        const costumer = await costumerService.execute({ name, email, age, income });
        reply.send(costumer);

    }
}

export { CreateCostumerController }