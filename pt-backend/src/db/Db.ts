import { ConnectionOptions, createConnections } from "typeorm";

/*
    Prepare db
 */
const options: ConnectionOptions = {
  name: "default",
  type: "postgres",
  host: "localhost",
  port: 35432,
  username: "user",
  password: "pass",
  database: "db",
  entities: [],
  maxQueryExecutionTime: 5000,
  logging: false,
  synchronize: false
};

function initDb() {
  return createConnections([options]);
}

export { initDb };
