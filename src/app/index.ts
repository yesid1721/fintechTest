// Dependence need
import express, { Request, Response } from "express";
import * as bodyParser from "body-parser";
import config from '@app/config';
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";

// Config cors
import { corsOptions } from "@app/utils/cors";

// Routes
import routes from "@app/api/routes";
import { swaggerSpec, swaggerUi } from "@app/app/swagger";

// App
const app = express();

// settings
app.set("port", config.port ?? 8080);

// Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// ------------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use(cors(corsOptions));
app.use(morgan("combined"));
app.use(helmet());
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).send({ error: err.message });
  }
);

// Iniciar las tareas cron
//startCronJobs();

console.log("--------------------------");
// mount api v1 routes
app.get("/", (_req, res) => {
  res.send("Bienvenido este es el backend de la aplicación de la Wallet");
});
app.use("/api/v1", cors(corsOptions), routes);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// Manejo de rutas no encontradas
app.use("*", (_req: Request, res: Response) => {
  res.status(404).send("Not Found");
});

const init = async () => {
  try {
    app.listen(app.get("port"), () => {
      console.log(`Server in ${config.node} mode on port ${app.get("port")}`);
      const baseUrl = `${config.baseUrl}:${app.get("port")}`;
      if (config.node === "development") {
        console.log(`API is available at ${baseUrl}/api/v1`);
        console.log(`Swagger is available at ${baseUrl}/docs`);
      } else if (config.node === "production") {
        console.log(`API is available at ${config.baseUrl}/api/v1`);
        console.log(`Swagger is available at ${config.baseUrl}/docs`);
      }
      console.log("--------------------------");
    });
  } catch (error) {
    console.error(error);
  }
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(0);
});

export { init };
