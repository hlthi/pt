import { NextFunction, Request, Response } from "express";
import boom from "@hapi/boom";
import { getManager } from "typeorm";
import { IUser } from "./v1_auth";
import Joi from "@hapi/joi";

/**
 * Fish get handler.
 */
export const fish_get_handler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IUser = res.locals.user;
  const fish_id = req.params.id;

  try {
    /**
     * Get one
     */
    const result = await getManager().query(
      "SELECT * FROM fish WHERE fish.id = $1",
      [fish_id]
    );

    // return result
    return res.json(result[0]);
  } catch (e) {
    console.log(e.message);
    return next(boom.internal(e.message));
  }
};
