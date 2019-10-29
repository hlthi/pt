import { NextFunction, Request, Response } from "express";
import boom from "@hapi/boom";
import { getManager } from "typeorm";
import { IUser } from "./v1_auth";
import Joi from "@hapi/joi";

/**
 * Fish Delete handler.
 */
export const fish_delete_handler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IUser = res.locals.user;
  const fish_id = req.params.id;

  try {
    /**
     * Check fish id  is exist
     */
    const is_exist_res = await getManager().query(
      "SELECT fish.id FROM fish WHERE fish.id = $1",
      [fish_id]
    );

    /**
     * If not exist, return error
     */
    if (is_exist_res.length === 0) {
      return next(boom.badRequest(`${fish_id} is not  exist.`));
    }

    /**
     * Update
     */
    await getManager().query(`DELETE FROM fish WHERE fish.id = $1`, [fish_id]);

    // return result
    return res.sendStatus(200);
  } catch (e) {
    console.log(e.message);
    return next(boom.internal(e.message));
  }
};
