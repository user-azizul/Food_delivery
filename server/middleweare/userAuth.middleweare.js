import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  const authToken = req.headers.authorization?.split(" ")[1];
  if (!authToken)
    return res.json({
      success: false,
      message: "Not Authorized, Please login"
    });
  console.log(authToken);
  try {
    // Decode the token using the secret
    const tokenDecode = jwt.verify(authToken, process.env.JWT_SECRET);

    // Attach the decoded user info to req.user
    req.user = tokenDecode;

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in user authentication" });
  }
};
