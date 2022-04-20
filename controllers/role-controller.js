const Role = require("../db/models/roles");

module.exports = {
  addRole: async (req, res) => {
    try {
      const { role } = req.body;
      const newRole = await Role.query().insert({
        role: role,
      });
      res.json(newRole);
    } catch (e) {
      res.json(e);
      res.status(500);
    }
  },
};
