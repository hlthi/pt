import winston, { format } from "winston";
const { combine, printf } = format;

const myFormat = printf(
  info => `[${new Date()}] [${info.level}]  ${info.message}`
);

const logger = winston.createLogger({
  level: "debug",
  format: combine(myFormat),
  defaultMeta: { service: "user-service" },
  transports: [
    new winston.transports.Console(),
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error"
    }),
    new winston.transports.File({ filename: "logs/combined.log" })
  ]
});

export default logger;
