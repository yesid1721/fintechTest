
import { Router } from "express";
import config from "@app/config";
import { 
    customers,
    wallet 
} from "@api/v1.routes";

const routes = Router();

routes.get("/", (_, res) => {
    res.send(`Bienvenido esta es la API Rest en la version ${config.apiVersion}`);
}); 

routes.use("/customers", customers);
routes.use("/wallet", wallet);

export default routes;

