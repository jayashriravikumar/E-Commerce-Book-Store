export const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  console.log("COOKIE EXPIRE RAW =", process.env.JWT_COOKIE_EXPIRE);
  console.log("COOKIE EXPIRE NUMBER =", Number(process.env.JWT_COOKIE_EXPIRE));

  const options = {
    httpOnly: true,
    maxAge: Number(process.env.JWT_COOKIE_EXPIRE) * 24 * 60 * 60 * 1000,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};
