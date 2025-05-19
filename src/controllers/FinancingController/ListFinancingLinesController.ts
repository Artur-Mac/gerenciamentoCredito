import { FastifyRequest, FastifyReply } from "fastify";
import { ListFinancingLinesService } from "../../services/FinancingService/ListFinancingLinesService";

class ListFinancingLinesController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listFinancingLinesService = new ListFinancingLinesService();
    const financingLines = await listFinancingLinesService.execute();
    reply.send(financingLines);
  }
}
export { ListFinancingLinesController };