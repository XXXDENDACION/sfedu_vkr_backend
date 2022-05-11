const jwt = require("jsonwebtoken");
const Token = require("../db/models/token");
require("dotenv").config();

const TokenService = {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "24h",
    });
    return {
      accessToken,
      refreshToken,
    };
  },

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.query().findOne({ userId: userId });
    if (tokenData) {
      console.log("EXIST");
      const newToken = { ...tokenData, refreshToken: refreshToken };
      const updatedToken = await Token.query().patchAndFetchById(
        newToken.id,
        newToken
      );
      console.log(updatedToken);
      return updatedToken;
    }

    console.log("@", userId, refreshToken);
    const token = await Token.query().insertAndFetch({
      userId: userId,
      refreshToken: refreshToken,
    });
    return token;
  },

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  },

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (e) {
      return null;
    }
  },

  async findToken(refreshToken) {
    const tokenData = await Token.query().where({
      refreshToken: refreshToken,
    });
    return tokenData;
  },
};

module.exports = TokenService;
