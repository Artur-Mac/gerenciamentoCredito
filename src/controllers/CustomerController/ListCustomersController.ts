import { FastifyRequest, FastifyReply } from "fastify";
import { ListCustomersService } from "../../services/CustomerService/ListCustomersService"; 
import { IFilterCustomerDTO } from "../../interfaces/IFilterCustomerDTO"; 

class ListCustomersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    // Extrair query parameters
    const query = request.query as any; // Use 'any' por simplicidade aqui, ou defina um tipo para query

    const filters: IFilterCustomerDTO = {};

    // Filtro por ID
    if (query.id) filters.id = String(query.id);

    // Filtro por nome
    if (query.name) filters.name = String(query.name);

    // Filtro por email
    if (query.email) filters.email = String(query.email);

    // Converter para número, se existirem
    if (query.minAge) filters.minAge = parseInt(String(query.minAge), 10);
    if (query.maxAge) filters.maxAge = parseInt(String(query.maxAge), 10);
    if (query.minIncome) filters.minIncome = parseFloat(String(query.minIncome));
    if (query.maxIncome) filters.maxIncome = parseFloat(String(query.maxIncome));

    // Validação de NaN após parseInt/parseFloat (opcional, mas recomendado)
    if (query.minAge && isNaN(filters.minAge!)) delete filters.minAge;
    if (query.maxAge && isNaN(filters.maxAge!)) delete filters.maxAge;
    if (query.minIncome && isNaN(filters.minIncome!)) delete filters.minIncome;
    if (query.maxIncome && isNaN(filters.maxIncome!)) delete filters.maxIncome;

    const listCustomersService = new ListCustomersService();

    try {
      const customers = await listCustomersService.execute(filters);
      reply.status(200).send(customers);
    } catch (error) {
      console.error("Error in ListCustomersController:", error);
      reply.status(500).send({ message: "Internal server error." });
    }
  }
}

export { ListCustomersController };