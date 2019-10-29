import { NextFunction, Request, Response } from "express";
import boom from "@hapi/boom";
import Joi from "@hapi/joi";
import { getManager } from "typeorm";
import Boom from "@hapi/boom";
import jwt from "jsonwebtoken";
import { secret_key } from "../security/secret_key";

// Login request interface
interface ILoginRequest {
  username: string;
  password: string;
}
/**
 * Login handler.
 */
export const login_handler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // validate login request
  const login_validator_res = login_validator.validate<ILoginRequest>(req.body);
  if (login_validator_res.error) {
    return next(boom.badRequest(login_validator_res.error.message));
  }

  // in real server can be bcrypt
  try {
    const user_res = await getManager().query(
      "SELECT id FROM users WHERE users.username = $1 AND users.pass = $2",
      [login_validator_res.value.username, login_validator_res.value.password]
    );

    // wrong credantials
    if (user_res.length === 0)
      return next(Boom.badRequest("Username or pass is wrong."));

    // user exist
    const id: number = user_res[0].id;

    // create key
    const key = jwt.sign(
      {
        id,
        username: login_validator_res.value.username
      },
      secret_key,
      { algorithm: "HS256", expiresIn: "1y" }
    );

    // return result
    return res.json({
      key
    });
  } catch (e) {
    console.log(e);
    return next(boom.internal(e.message));
  }
};

const login_validator = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
});
