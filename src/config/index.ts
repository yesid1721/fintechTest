import { version } from "../../package.json";

export default {
  port: process.env.PORT,
  node: process.env.NODE_ENV,
  baseUrl: process.env.BASE_URL,
  email: process.env.SEND_EMAIL,
  emailPass: process.env.EMAIL_PASS,
  apiVersion: version,
  database: {
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE_NAME,
      ssl: true,
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    },
  },
};

