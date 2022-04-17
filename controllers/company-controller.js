const Company = require("../db/models/company");
const User = require("../db/models/user");

module.exports = {
  createCompany: async (req, res) => {
    try {
      const { name, userId } = req.body;
      const isHasUserId = (await User.query().where({ id: userId })).length;

      if (!isHasUserId) {
        return res.json("User have not exist");
      }

      const company = await Company.query().insert({
        name: name,
        userId: userId,
      });
      res.json(company);
    } catch (e) {
      console.error(e);
      res.json(e);
      res.status(500);
    }
  },
};
