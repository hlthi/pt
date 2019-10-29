import { NextFunction, Request, Response } from "express";
import boom from "@hapi/boom";
import { getManager } from "typeorm";
import { IUser } from "./v1_auth";

/**
 * Stock get handler.
 */
export const stock_get_handler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IUser = res.locals.user;
  try {
    /*
    Get stock data
     */
    const stock_all = await getManager().query(
      "SELECT stock.fish_id,fish.name,stock.stock_amount,stock.price,fish.image_url FROM stock,fish WHERE fish.id = stock.fish_id",
      []
    );

    return res.json(stock_all);
  } catch (e) {
    console.log(e.message);
    return next(boom.internal(e.message));
  }
};
