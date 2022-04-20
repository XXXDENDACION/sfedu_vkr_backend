const Skill = require("../db/models/skills");

module.exports = {
  addSkill: async (req, res) => {
    try {
      const { skill } = req.body;
      const newSkill = await Skill.query().insert({
        skill: skill,
      });
      res.json(newSkill);
    } catch (e) {
      res.json(e);
      res.status(500);
    }
  },
};
