import { NextFunction, Request, Response } from "express";
import boom from "@hapi/boom";
import { getManager } from "typeorm";
import { IUser } from "./v1_auth";
import Joi from "@hapi/joi";

// Fish request interface
interface IFishPostRequest {
  name: string;
  image_url: string;
}

/**
 * Fish handler.
 */
export const fish_post_handler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IUser = res.locals.user;

  // validate fish post request
  const fish_validator_res = fish_post_validator.validate<IFishPostRequest>(
    req.body
  );
  if (fish_validator_res.error) {
    return next(boom.badRequest(fish_validator_res.error.message));
  }

  try {
    const { value } = fish_validator_res;
    /**
     * Check fish already exist
     */
    const is_exist_res = await getManager().query(
      "SELECT fish.name FROM fish WHERE fish.name = $1",
      [value.name]
    );

    /**
     * If exist, return error
     */
    if (is_exist_res.length > 0) {
      return next(boom.badRequest(`${is_exist_res[0].name} already exist.`));
    }

    /**
     * Insert fish
     */
    const fish_res = await getManager().query(
      `INSERT INTO fish(name,image_url) VALUES($1,$2) RETURNING id,name,image_url`,
      [value.name, value.image_url]
    );

    /**
     * Insert stock
     */
    const stock_res = await getManager().query(
      `INSERT INTO stock(fish_id,stock_amount,price) VALUES($1,$2,$3)`,
      [fish_res[0].id, 0, 0]
    );

    // return result
    return res.json(fish_res[0]);
  } catch (e) {
    console.log(e.message);
    return next(boom.internal(e.message));
  }
};

const fish_post_validator = Joi.object().keys({
  name: Joi.string().required(),
  image_url: Joi.string().required()
});
