// src/controllers/EditCustomerController.ts
import { FastifyRequest, FastifyReply } from "fastify";
import { IEditCustomerDTO } from "../interfaces/IEditCustomerDTO";
import { EditCustomerService } from "../services/EditCustomerService";

interface IEditCustomerParams {
  id: string;
}

class EditCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    // 1. Extrair o ID do cliente dos parâmetros da rota
    // Assumindo que a rota seja algo como /customers/:id
    const { id } = request.params as IEditCustomerParams;

    // 2. Extrair os dados de atualização do corpo da requisição
    // Fastify já faz o parse do JSON do corpo por padrão
    const updateData = request.body as IEditCustomerDTO;

    // Validação básica (poderia ser mais robusta com schemas do Fastify)
    if (!id) {
      return reply.status(400).send({ message: "Customer ID is required in URL parameters." });
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      return reply.status(400).send({ message: "No data provided for update in request body." });
    }

    const editCustomerService = new EditCustomerService();

    try {
      const updatedCustomer = await editCustomerService.execute(id, updateData);
      reply.status(200).send(updatedCustomer);
    } catch (error) {
      if (error instanceof Error) {
        // Tratamento de erros específicos do serviço
        if (error.message === "Customer not found.") {
          return reply.status(404).send({ message: error.message });
        }
        if (error.message === "Email already in use by another customer.") {
          return reply.status(409).send({ message: error.message }); // 409 Conflict
        }
        if (error.message === "No data provided for update.") {
            return reply.status(400).send({ message: error.message });
        }
        // Outros erros de validação ou de serviço
        return reply.status(400).send({ message: error.message });
      }
      // Erro genérico do servidor
      console.error("Internal server error in EditCustomerController:", error); // Logar o erro
      reply.status(500).send({ message: "Internal server error." });
    }
  }
}

export { EditCustomerController }; 

