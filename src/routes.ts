import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateCostumerController } from "./controllers/CreateCustomersController";
import { ListCustomersController } from "./controllers/ListCustomersController";
import { ListCreditController } from "./controllers/ListCreditController";

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
  }
  