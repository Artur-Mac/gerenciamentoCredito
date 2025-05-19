// src/controllers/EditCustomerController.ts
import { FastifyRequest, FastifyReply } from "fastify";
import { IEditCustomerDTO } from "../interfaces/IEditCustomerDTO";
import { EditCustomerService } from "../services/EditCustomerService";

interface IEditCustomerParams {
  id: string;
}

class EditCustomerController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    
    const { id } = request.params as IEditCustomerParams;

    
    const updateData = request.body as IEditCustomerDTO;

   
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
        
        if (error.message === "Customer not found.") {
          return reply.status(404).send({ message: error.message });
        }
        if (error.message === "Email already in use by another customer.") {
          return reply.status(409).send({ message: error.message }); 
        }
        if (error.message === "No data provided for update.") {
            return reply.status(400).send({ message: error.message });
        }
        
        return reply.status(400).send({ message: error.message });
      }
      
      console.error("Internal server error in EditCustomerController:", error); 
      reply.status(500).send({ message: "Internal server error." });
    }
  }
}

export { EditCustomerController }; 

