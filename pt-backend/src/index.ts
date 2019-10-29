import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { initDb } from "./db/Db";
import morgan from "morgan";
import fs from "fs";
import catch_all_error_mw from "./util/catch_all_error_mw";
import logger from "./logger/logger";
import shutdown from "./shutdown";
import v1_router from "./v1/v1_router";

async function main() {
  // init db
  // can need wait really
  await initDb();

  // create express
  const app = express();

  // For each request, provide wildcard Access-Control-* headers via OPTIONS call
  app.use(cors());

  // For each request, parse request body into a JavaScript object where header Content-Type is application/json
  app.use(bodyParser.json());

  // can be rotating write stream
  // create a write stream (in append mode)
  const accessLogStream = fs.createWriteStream("logs/access.log", {
    flags: "a"
  });

  // set access log stream
  app.use(morgan("combined", { stream: accessLogStream }));

  // set v1_router
  app.use("/v1", v1_router);

  app.use(catch_all_error_mw);

  const server = app.listen(3063, () =>
    console.log(`API listening on port 3063!`)
  );

  /**
   * Shutdown handler
   */
  process.on("SIGTERM", () => {
    shutdown(server);
  });
  process.on("SIGINT", () => {
    shutdown(server);
  });
}

main().catch(e => {
  console.log(e);
  logger.debug(e.message);
});
