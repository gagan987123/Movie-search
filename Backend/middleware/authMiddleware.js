const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  // const token = req.header("Authorization")?.split(" ")[1];
  const sessionData = req.session.user;
  if (!sessionData)
    return res.status(401).json({ message: "Unauthorized. Please log in." });

  const { token } = sessionData;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};
module.exports = verifyToken;
