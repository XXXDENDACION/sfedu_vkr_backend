const bcrypt = require("bcrypt");
const User = require("../db/models/user");
const TokenService = require("../services/token-service");

module.exports = {
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.query().findOne({ email });
      if (!user) {
        throw new Error("No user");
      }
      const isPassEquals = await bcrypt.compare(password, user.password);
      if (!isPassEquals) {
        throw new Error("Неверный пароль");
      }
      const tokens = TokenService.generateTokens({
        id: user.id,
        email: user.email,
        password: user.password,
        isEmployee: user.isEmployee,
      });
      const testToken = await TokenService.saveToken(
        user.id,
        tokens.refreshToken
      );
      console.log(testToken);

      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json({ user, ...tokens });
    } catch (e) {
      res.status(500);
      console.log(e);
      res.json(e);
    }
  },

  registration: async (req, res) => {
    try {
      const { email, password, ...data } = req.body;
      const canditate = await User.query().findOne({ email: email });
      if (canditate) {
        throw new Error("Пользователь с таким email уже существует");
      }

      const hashPassword = await bcrypt.hash(password, 3);
      const user = await User.query().insertAndFetch({
        email,
        password: hashPassword,
        ...data,
      });

      const tokens = TokenService.generateTokens({
        id: user.id,
        email: user.email,
        password: user.hashPassword,
        isEmployee: user.isEmployee,
      });

      await TokenService.saveToken(user.id, tokens.refreshToken);

      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json({
        ...tokens,
        user: user,
      });
    } catch (e) {
      res.status(500);
      console.log(e);
      res.json(e);
    }
  },

  refresh: async (req, res, next) => {
    try {
      const { refreshToken } = req.cookies;
      if (!refreshToken) {
        throw new Error("Token");
      }
      const userData = TokenService.validateRefreshToken(refreshToken);
      const tokenFromDb = await TokenService.findToken(refreshToken);
      console.log(userData);
      if (!userData || !tokenFromDb) {
        throw new Error("Unauthorized error");
      }

      const user = await User.query().findById(userData.id);
      const tokens = TokenService.generateTokens({
        id: user.id,
        email: user.email,
        password: user.hashPassword,
        isEmployee: user.isEmployee,
      });

      await TokenService.saveToken(user.id, tokens.refreshToken);
      res.cookie("refreshToken", tokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json({
        ...tokens,
        user: user,
      });
    } catch (e) {
      res.status(500);
      res.json(e);
    }
  },
  logout: async (req, res) => {},
};
