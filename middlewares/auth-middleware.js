const TokenService = require("../services/token-service");

module.exports = function (req, res, next) {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw new Error("no auth");
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      throw new Error("no auth");
    }

    const userData = TokenService.validateAccessToken(accessToken);
    if (!userData) {
      throw new Error("no auth");
    }
    req.user = userData;
    next();
  } catch (e) {
    throw new Error("no auth");
  }
};
