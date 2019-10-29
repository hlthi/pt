import { NextFunction, Request, Response } from "express";
import Boom from "@hapi/boom";
import jwt from "jsonwebtoken";
import { secret_key } from "../security/secret_key";

export interface IUser {
  id: number;
  username: string;
}

const v1_auth_middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorizationStr = req.header("Authorization");
  if (!authorizationStr) return next(Boom.unauthorized());

  const parts = authorizationStr.split(/\s+/);
  if (parts[0].toLowerCase() !== "bearer") {
    return next(
      Boom.unauthorized("Your header format must be -> Bearer <token>")
    );
  }

  if (parts.length !== 2) {
    return next(Boom.badRequest("Bad HTTP authentication header format"));
  }

  try {
    const decoded: any = jwt.verify(parts[1], secret_key);
    const user: IUser = { id: decoded.id, username: decoded.username };
    res.locals.user = user;
  } catch (e) {
    return next(Boom.badRequest(e));
  }

  return next();
};

export default v1_auth_middleware;
