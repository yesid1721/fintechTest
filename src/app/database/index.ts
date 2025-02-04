import { Sequelize } from "sequelize";
import config from "@app/config";

const preConfig = config.database.connection;

const DEFAULTS = {
  connection: preConfig,
  pool: {
    min: 2,
    max: 10,
  },
  useNullAsDefault: true,
  attach: "onPreHandler",
  detach: "tail",
  debug: false,
  acquireConnectionTimeout: 10000,
};

let sequelizeInstance: Sequelize | null = null;

const createInstanceDb = () => {
  if (
    !DEFAULTS.connection.database ||
    !DEFAULTS.connection.user ||
    !DEFAULTS.connection.password
  ) {
    throw new Error(
      "Database configuration is incomplete. Please check your environment variables."
    );
  }
  sequelizeInstance = new Sequelize(
    DEFAULTS.connection.database,
    DEFAULTS.connection.user,
    DEFAULTS.connection.password,
    {
      host: DEFAULTS.connection.host,
      port: DEFAULTS.connection.port,
      dialect: "mysql",
      pool: DEFAULTS.pool,
      logging: console.log,
      define: {
        timestamps: false,
      },
    }
  );

  sequelizeInstance
    .authenticate()
    .then(() => {
      console.info("Connected to Mysql successfully");
      console.log("--------------------------");
    })
    .catch((error) => {
      console.error("Failed to connect to SQL Server database:", error);
    });
};

export const getDbInstance = (): Sequelize => {
  if (!sequelizeInstance) {
    createInstanceDb();
  }
  if (!sequelizeInstance) {
    throw new Error("Failed to create a Sequelize instance.");
  }
  return sequelizeInstance;
};

export const closeDbInstance = async () => {
  if (sequelizeInstance) {
    await sequelizeInstance.close();
    sequelizeInstance = null;
  }
};

createInstanceDb();
