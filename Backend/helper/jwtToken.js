export const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  //console.log("COOKIE EXPIRE RAW =", process.env.JWT_COOKIE_EXPIRE);
  //console.log("COOKIE EXPIRE NUMBER =", Number(process.env.JWT_COOKIE_EXPIRE));

  const options = {
    httpOnly: true,
    maxAge: Number(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  // Remove password from the response
  user.password = undefined;

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};
