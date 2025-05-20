// src/controllers/creditApplication/CreateCreditApplicationController.ts
import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCreditApplicationService } from "../../services/creditApplication/CreateCreditApplicationService";
import { ICreateCreditApplicationDTO } from "../../interfaces/ICreateCreditApplicationDTO";

class CreateCreditApplicationController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const data = request.body as ICreateCreditApplicationDTO;
    const service = new CreateCreditApplicationService();

    try {
      const application = await service.execute(data);
      return reply.status(201).send(application);
    } catch (error) {
      if (error instanceof Error) {
        if (
            error.message.includes("not found") ||
            error.message.includes("not active")
        ) {
            return reply.status(404).send({ message: error.message });
        }
        return reply.status(400).send({ message: error.message });
      }
      console.error("Error in CreateCreditApplicationController:", error);
      return reply.status(500).send({ message: "Internal server error" });
    }
  }
}
export { CreateCreditApplicationController };