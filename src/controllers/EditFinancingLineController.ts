import { FastifyRequest, FastifyReply } from "fastify";
import { IEditFinancingLineDTO } from "../interfaces/IEditFinancingLineDTO";
import { EditFinancingLineService } from "../services/EditFinancingLineService";

interface IEditFinancingLineParams {
  id: string;
}

class EditFinancingLineController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as IEditFinancingLineParams;
    const updateData = request.body as IEditFinancingLineDTO;

    if (!id) {
      return reply.status(400).send({ message: "Financing Line ID is required in URL parameters." });
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      return reply.status(400).send({ message: "No data provided for update in request body." });
    }

    const editFinancingLineService = new EditFinancingLineService();

    try {
      const updatedFinancingLine = await editFinancingLineService.execute(id, updateData);
      reply.status(200).send(updatedFinancingLine);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "Financing Line not found.") {
          return reply.status(404).send({ message: error.message });
        }
        if (error.message === "Name already in use by another Financing Line.") {
          return reply.status(409).send({ message: error.message });
        }
        if (error.message === "No data provided for update.") {
            return reply.status(400).send({ message: error.message });
        }
        return reply.status(400).send({ message: error.message });
      }
      console.error("Internal server error in EditFinancingLineController:", error);
      reply.status(500).send({ message: "Internal server error." });
    }
  }
}

export { EditFinancingLineController };