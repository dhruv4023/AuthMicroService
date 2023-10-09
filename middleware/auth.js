import jwt from "jsonwebtoken";


// Middleware function to verify JWT tokens
export const verifyToken = async (req, res, next) => {
  try {
    // Retrieve the token from the "Authorization" header
    let token = req.header("Authorization");
    // console.log(token);
    // Check if the token is missing
    if (!token) {
      return res.status(403).send({ msg: "Access denied" });
    }

    // Check if the token starts with "Bearer " and remove it
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    // console.log(process.env.JWT_SECRECT);
    // Verify the token using the JWT_SECRECT from environment variables
    const verified = jwt.verify(token, process.env.JWT_SECRECT);

    // Attach the verified user information to the request object
    req.user = verified;

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    // Handle token verification errors
    // console.log(err);
    res
      .status(500)
      .json({ msg: "error in token verification", error: err.message });
  }
};
