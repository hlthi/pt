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
 * Fish Put handler.
 */
export const fish_put_handler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IUser = res.locals.user;
  const fish_id = req.params.id;

  // validate fish pust request
  const fish_validator_res = fish_post_validator.validate<IFishPostRequest>(
    req.body
  );
  if (fish_validator_res.error) {
    return next(boom.badRequest(fish_validator_res.error.message));
  }

  try {
    const { value } = fish_validator_res;

    /**
     * Check fish id already exist
     */
    const is_exist_res = await getManager().query(
      "SELECT fish.id FROM fish WHERE fish.id = $1",
      [fish_id]
    );

    /**
     * If exist, return error
     */
    if (is_exist_res.length === 0) {
      return next(boom.badRequest(`${fish_id} is not  exist.`));
    }

    /**
     * Update
     */
    const update_res = await getManager().query(
      `UPDATE fish SET name = $1,image_url = $2 WHERE id=$3 RETURNING id,name,image_url`,
      [value.name, value.image_url, fish_id]
    );

    // return result
    return res.json(update_res[0]);
  } catch (e) {
    console.log(e.message);
    return next(boom.internal(e.message));
  }
};

const fish_post_validator = Joi.object().keys({
  name: Joi.string().required(),
  image_url: Joi.string().required()
});
