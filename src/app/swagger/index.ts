import config from "@app/config";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition: any = {
    openapi: "3.0.0",
    info: {
      title: "API Wallet",
      description:
        "This API use swaager to documentation.",
      contact: {
        name: "YessidDev",
        email: "yessid1721@gmail.com",
      },
      version: config.apiVersion,
    },
    servers: [
      {
        url: `http://localhost:5000/api/v1`,
        description: "Local serve",
      },
      {
        url: `${process.env.SWAGGER_SERVER_CLOUD}/api/v1`,
        description: "Cloud server",
      },
    ],
    components: {
      securitySchemes: {
      },
    },
    security: [
      {
        ApiKeyAuth: {
          type: "apiKey",
          name: "Authorization",
        },
      },
    ],
  };
  
  const options = {
    swaggerDefinition,
    apis: ["./docs/*.ts"], // Asegúrate de que esta ruta sea correcta
  };
  
  const swaggerSpec = swaggerJsdoc(options);
  
  export { swaggerSpec, swaggerUi };
  