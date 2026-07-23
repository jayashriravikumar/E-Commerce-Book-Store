import logger from "./winstonLogger.js";

export const errorLogger = (err, req, res, next) => {
  logger.error({
    route: req.originalUrl,
    method: req.method,
    message: err.message,
    status: err.statusCode || 500,
  });

  next(err);
};