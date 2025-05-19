import { FastifyRequest, FastifyReply } from "fastify";
import { ICreateFinancingLineDTO } from "../interfaces/ICreateFinancingLineDTO";
import { CreateFinancingLineService } from "../services/CreateFinancingLineService";

class CreateFinancingLineController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const data = request.body as ICreateFinancingLineDTO;

    const createFinancingLineService = new CreateFinancingLineService();

    try {
      const newFinancingLine = await createFinancingLineService.execute(data);
      reply.status(201).send(newFinancingLine);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Financing Line with this name already exists.") {
          return reply.status(409).send({ message: error.message });
        }
        if (error.message === "Name and Property Type are required.") {
            return reply.status(400).send({ message: error.message });
        }
        return reply.status(400).send({ message: error.message });
      }
      console.error("Internal server error in CreateFinancingLineController:", error);
      reply.status(500).send({ message: "Internal server error." });
    }
  }
}

export { CreateFinancingLineController };