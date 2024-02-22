import jwt from "jsonwebtoken";
import RESPONSE from "../helpers/response.helper.js";
import config from "../config/config.js";

export const verifyTokenAndRole = (allowedRoles) => (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.split("Bearer ")[1];

    if (!token) {
      RESPONSE.error(res, 5002, 403);
      return;
    }

    const verified = jwt.verify(token, config.jwt_secret, { ignoreExpiration: false });
    req.tokenData = verified;

    if (!allowedRoles.includes(verified.role)) {
      RESPONSE.error(res, 5001, 403);
      return;
    }

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      RESPONSE.error(res, 5003, 403); // Error code for token expired
    } else {
      RESPONSE.error(res, 9999, 500, error);
    }
  }
};
