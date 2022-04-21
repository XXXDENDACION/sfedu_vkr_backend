const { Model } = require("objection");

class UsersSkills extends Model {
  static get tableName() {
    return "users_skills";
  }
}

module.exports = UsersSkills;