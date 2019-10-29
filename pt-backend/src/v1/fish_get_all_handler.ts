import { NextFunction, Request, Response } from "express";
import boom from "@hapi/boom";
import { getManager } from "typeorm";
import { IUser } from "./v1_auth";

/**
 * Fish handler.
 */
export const fish_get_all_handler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IUser = res.locals.user;
  try {
    /**
     * Get all
     */
    const result_arr = await getManager().query("SELECT * FROM fish", []);

    // return result
    return res.json(result_arr);
  } catch (e) {
    console.log(e.message);
    return next(boom.internal(e.message));
  }
};
