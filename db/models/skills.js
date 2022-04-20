const { Model } = require("objection");

class Skill extends Model {
  static get tableName() {
    return "skills";
  }
}

module.exports = Skill;
