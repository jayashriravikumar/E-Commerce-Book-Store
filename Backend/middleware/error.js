export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  //Duplicate Key Error
  if (err.code === 11000) {
    const duplicateField = Object.keys(err.keyValue || {})[0];
    err.statusCode = 409;
    err.message = duplicateField
      ? `${duplicateField} already exists`
      : "Duplicate value entered";
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
