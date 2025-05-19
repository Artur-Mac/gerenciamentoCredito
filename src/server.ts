import fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes";

const app = fastify({ logger: true });

app.register(cors)
app.register(routes);

const start = async () => {
    try{
        await app.listen({ port: 7777})
    }catch(err){
        process.exit(1)
    }
}

start();