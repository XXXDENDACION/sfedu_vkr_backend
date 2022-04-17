const User = require("../db/models/user");

module.exports = {
  getAll: async (req, res) => {
    try {
      const users = await User.query();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500);
    }
  },

  addUp: async (req, res) => {
    try {
      const { name, email, photo, isEmployee, position } = req.body;
      const isExist = (await User.query().where("email", email)).length;
      if (!!isExist) {
        return res.json("Email is already exist");
      }
      const user = await User.query().insert({
        name,
        email,
        photo,
        isEmployee,
        position,
      });
      res.json(user);
    } catch (e) {
      console.error(e);
      res.json(e);
    }
  },

  patchUp: async (req, res) => {
    try {
      const { id, name, email, photo, isEmployee, position } = req.body;
      const patchedUser = await User.query().patchAndFetchById(id, {
        name,
        email,
        photo,
        isEmployee,
        position,
      });
      res.json(patchedUser);
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  },
};
