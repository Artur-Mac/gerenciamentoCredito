// src/controllers/FinancingController/ListFinancingLinesController.ts
import { FastifyRequest, FastifyReply } from "fastify";
import { ListFinancingLinesService } from "../../services/FinancingService/ListFinancingLinesService";
import { IFilterFinancingLineDTO } from "../../interfaces/IFilterFinancingLineDTO";

class ListFinancingLinesController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const query = request.query as Record<string, string>;
    const filters: IFilterFinancingLineDTO = {};

    if (query.id) {
      filters.id = query.id;
    }
    if (query.name) {
      filters.name = query.name;
    }
    if (query.propertyType) {
      filters.propertyType = query.propertyType;
    }
    if (query.compatibleWithModalityType) {
      filters.compatibleWithModalityType = query.compatibleWithModalityType;
    }

    if (query.isActive !== undefined) {
      if (query.isActive.toLowerCase() === 'true') {
        filters.isActive = true;
      } else if (query.isActive.toLowerCase() === 'false') {
        filters.isActive = false;
      }
    }

    const listFinancingLinesService = new ListFinancingLinesService();

    try {
      const financingLines = await listFinancingLinesService.execute(filters);
      reply.status(200).send(financingLines);
    } catch (error) {
      console.error("Error in ListFinancingLinesController:", error);
      reply.status(500).send({ message: "Internal server error." });
    }
  }
}

export { ListFinancingLinesController };