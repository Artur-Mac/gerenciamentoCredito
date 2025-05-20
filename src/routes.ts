import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateCostumerController } from "./controllers/CustomerController/CreateCustomersController";
import { ListCustomersController } from "./controllers/CustomerController/ListCustomersController";
import { ListCreditController } from "./controllers/CreditController/ListCreditController";
import { EditCustomerController } from "./controllers/CustomerController/EditCustomerController";
import { CreateCreditModalityController } from "./controllers/CreditController/CreateCreditController";
import { EditCreditModalityController } from "./controllers/CreditController/EditCreditController";
import { ListFinancingLinesController } from "./controllers/FinancingController/ListFinancingLinesController";
import { CreateFinancingLineController } from "./controllers/FinancingController/CreateFinancingLineController";
import { EditFinancingLineController } from "./controllers/FinancingController/EditFinancingLineController";
import { CreateCreditApplicationController } from "./controllers/creditAplication/CreateCreditApplicationController";

export async function routes(fastify: FastifyInstance, option: FastifyPluginOptions) {
  fastify.get("/test", async () => {
    return { Funcionando: true };
  });

  fastify.post("/customer", async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateCostumerController().handle(request, reply);
  });

  fastify.get("/listcustomers", async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListCustomersController().handle(request, reply);
  });
  fastify.get("/listcredits", async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListCreditController().handle(request, reply);
  });

  const editCustomerController = new EditCustomerController();

  fastify.put(
    '/customers/:id',
    (request: FastifyRequest, reply: FastifyReply) => editCustomerController.handle(request, reply)
  );

  fastify.post("/credit", async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateCreditModalityController().handle(request, reply);
  });

  fastify.put(
    '/credit/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new EditCreditModalityController().handle(request, reply);
    }
  );

  fastify.get("/financinglines", async (request: FastifyRequest, reply: FastifyReply) => {
    return new ListFinancingLinesController().handle(request, reply);
  });

  fastify.post("/financingline", async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateFinancingLineController().handle(request, reply);
  });
  fastify.put(
    '/financingline/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      return new EditFinancingLineController().handle(request, reply);
    }
  );
  fastify.post("/creditapplication", async (request: FastifyRequest, reply: FastifyReply) => {
    return new CreateCreditApplicationController().handle(request, reply);
  });
  
}
