// src/controllers/EditCreditModalityController.ts
import { FastifyRequest, FastifyReply } from "fastify";
import { IEditCreditModalityDTO } from "../../interfaces/IEditCreditDTO";
import { EditCreditModalityService } from "../../services/CreditService/EditCreditService";

interface IEditCreditModalityParams {
  id: string;
}

class EditCreditModalityController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as IEditCreditModalityParams;
    const updateData = request.body as IEditCreditModalityDTO;

    if (!id) {
      return reply.status(400).send({ message: "Credit Modality ID is required in URL parameters." });
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      return reply.status(400).send({ message: "No data provided for update in request body." });
    }

    const editCreditModalityService = new EditCreditModalityService();

    try {
      const updatedModality = await editCreditModalityService.execute(id, updateData);
      reply.status(200).send(updatedModality);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Credit Modality not found.") {
          return reply.status(404).send({ message: error.message });
        }
        if (error.message === "Name already in use by another Credit Modality.") {
          return reply.status(409).send({ message: error.message });
        }
        if (error.message === "No data provided for update.") {
            return reply.status(400).send({ message: error.message });
        }
        return reply.status(400).send({ message: error.message });
      }
      console.error("Internal server error in EditCreditModalityController:", error);
      reply.status(500).send({ message: "Internal server error." });
    }
  }
}

export { EditCreditModalityController };