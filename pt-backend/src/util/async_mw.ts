import Boom from "@hapi/boom";
// wrapper for our async route handlers
// @ts-ignore
const aw = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(err => {
    if (!err.isBoom) {
      return next(Boom.badImplementation(err, fn.name));
    }
    return next(err, fn.name);
  });
};

export default aw;
