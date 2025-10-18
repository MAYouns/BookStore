const authService = require("../services/authService");

const requireAuthMiddleware = async (req, res, next) => {
  console.log("Validating user authenticaiton...");

  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).send({ message: "Missing access token." })
  const token = authHeader.substring(7);

  try {
    const results = await authService.verifyToken(token);
    req.currentUser = { username: results.username, role: results.role };
    return next();
  } catch (err) {
    console.log(err);
    res.status(401).send({ message: "Unauthorized" })
  }
}


module.exports = requireAuthMiddleware;