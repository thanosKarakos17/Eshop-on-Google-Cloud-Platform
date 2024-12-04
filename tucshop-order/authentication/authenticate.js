const jwtmod = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  const token = bearerHeader && bearerHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);
  try{
    const public_key = `-----BEGIN PUBLIC KEY-----\n${process.env.PUBLICKEY}\n-----END PUBLIC KEY-----`;

    const decodedToken = jwtmod.verify(token, public_key, {
        algorithms: ["RS256"],
    });

    const { username, option } = decodedToken;
    if (option === "Seller") {
        return res.status(403).json({ message: "Access forbidden: Customers are not allowed to modify products" });
    }
    req.body.Username = username;
    next();
    }
  catch(err){
    console.error("Token verification failed:", err.message);
    return res.sendStatus(403); // Forbidden if token is invalid
  }
};

module.exports = authenticate;