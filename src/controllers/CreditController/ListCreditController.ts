import { FastifyRequest, FastifyReply } from "fastify";
import { ListCreditService } from "../../services/CreditService/ListCreditService";

class ListCreditController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    
    const {
      minAge,
      maxAge,
      minIncome,
      maxIncome,
      interestType,
      maxTermYears,
      isActive,
    } = request.query as {
      minAge?: string;
      maxAge?: string;
      minIncome?: string;
      maxIncome?: string;
      interestType?: string;
      maxTermYears?: string;
      isActive?: string;
    };

    
    const filters = {
      minAge: minAge ? parseInt(minAge) : undefined,
      maxAge: maxAge ? parseInt(maxAge) : undefined,
      minIncome: minIncome ? parseFloat(minIncome) : undefined,
      maxIncome: maxIncome ? parseFloat(maxIncome) : undefined,
      interestType,
      maxTermYears: maxTermYears ? parseInt(maxTermYears) : undefined,
      isActive: isActive !== undefined ? isActive === "true" : undefined,
    };

    // Chamar o serviço com os filtros
    const listCreditService = new ListCreditService();
    const credits = await listCreditService.execute(filters);

    // Retornar os resultados
    reply.send(credits);
  }
}

export { ListCreditController };