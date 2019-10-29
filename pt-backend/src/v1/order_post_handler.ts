import { NextFunction, Request, Response } from "express";
import boom from "@hapi/boom";
import { getManager } from "typeorm";
import { IUser } from "./v1_auth";
import Joi from "@hapi/joi";

// Order post request interface
interface IOrderPostRequest {
  order_type: "buy" | "sell";
  fish_id: number;
  quantity: number;
  price: number;
}

/**
 * Order handler.
 */
export const order_post_handler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IUser = res.locals.user;

  // validate order post request
  const order_validator_res = order_post_validator.validate<IOrderPostRequest>(
    req.body
  );
  if (order_validator_res.error) {
    return next(boom.badRequest(order_validator_res.error.message));
  }

  try {
    const { value } = order_validator_res;

    const row = await getManager().query(
      "SELECT stock_amount,price FROM stock WHERE stock.fish_id = $1",
      [value.fish_id]
    );

    /**
     * Is exist ?
     */
    if (row.length === 0) {
      return next(boom.badRequest(`${value.fish_id} doesnt exist.`));
    }

    const stock_amount = row[0].stock_amount;

    /**
     * Handle buy
     */
    if (value.order_type === "buy") {
      /**
       * Amount check
       */
      if (stock_amount < value.quantity)
        return next(boom.badRequest(`Quantity is bigger than stock amount.`));

      await getManager().query(
        "UPDATE stock SET stock_amount = stock_amount - $1 WHERE stock.fish_id = $2 AND stock_amount > $3",
        [value.quantity, value.fish_id, value.quantity]
      );

      return res.sendStatus(200);
    }

    /**
     * Handle sell
     */
    if (value.order_type === "sell") {
      await getManager().query(
        "UPDATE stock SET stock_amount = stock_amount + $1, price = $2 WHERE stock.fish_id = $3",
        [value.quantity, value.price, value.fish_id]
      );

      return res.sendStatus(200);
    }
  } catch (e) {
    console.log(e);
    console.log(e.message);
    return next(boom.internal(e.message));
  }
};

const order_post_validator = Joi.object().keys({
  order_type: Joi.string().valid(["buy", "sell"]),
  fish_id: Joi.number(),
  quantity: Joi.number(),
  price: Joi.number().allow(null)
});
