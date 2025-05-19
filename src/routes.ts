import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateCostumerController } from "./controllers/CreateCustomersController";
import { ListCustomersController } from "./controllers/ListCustomersController";
import { ListCreditController } from "./controllers/ListCreditController";
import { EditCustomerController } from "./controllers/EditCustomerController";
import { CreateCreditModalityController } from "./controllers/CreateCreditController";
import { EditCreditModalityController } from "./controllers/EditCreditController";
import { ListFinancingLinesController } from "./controllers/ListFinancingLinesController";
import { CreateFinancingLineController } from "./controllers/CreateFinancingLineController";
import { EditFinancingLineController } from "./controllers/EditFinancingLineController";

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
}
