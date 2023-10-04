import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");
    console.log(token)
    if (!token) {
      return res.status(403).send({msg:"Access denied"});
    }
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }
    const verified = jwt.verify(token, process.env.JWT_SECRECT);
    req.user = verified;
    // console.log(req.user)
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
