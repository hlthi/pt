// @ts-ignore
import { NextFunction, Response, Request } from "express";
import Boom from "@hapi/boom";
import logger from "../logger/logger";

const catch_all_error_mw = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //normal error handle
  if (!Boom.isBoom(err)) {
    const boomError = Boom.internal("Internal error.");
    return res
      .status(boomError.output.statusCode)
      .json(boomError.output.payload);
  }

  // boom internal error handle
  if (err.isServer) {
    // user do not show this
    const boomError = Boom.internal("Internal error.");
    return res
      .status(boomError.output.statusCode)
      .json(boomError.output.payload);
  }

  return res.status(err.output.statusCode).json(err.output.payload);
};

export default catch_all_error_mw;
