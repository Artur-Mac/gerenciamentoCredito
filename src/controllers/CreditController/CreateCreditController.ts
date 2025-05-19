
import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCreditModalityService } from "../../services/CreditService/CreateCreditService"; 
import { ICreateCreditModalityDTO } from "../../interfaces/ICreateCreditDTO"; 

class CreateCreditModalityController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    
    const createData = request.body as ICreateCreditModalityDTO;

   
    if (!createData || Object.keys(createData).length === 0) {
      return reply.status(400).send({ message: "Request body cannot be empty." });
    }

    
    const createCreditModalityService = new CreateCreditModalityService();

    try {
      
      const newCreditModality = await createCreditModalityService.execute(createData);

      
      reply.status(201).send(newCreditModality);
    } catch (error) {
      
      if (error instanceof Error) {
        
        if (error.message.includes("already exists")) {
          return reply.status(409).send({ message: error.message }); 
        }
        
        return reply.status(400).send({ message: error.message });
      }
      // Erro genérico do servidor
      console.error("Internal server error in CreateCreditModalityController:", error); 
      reply.status(500).send({ message: "Internal server error." });
    }
  }
}

export { CreateCreditModalityController };