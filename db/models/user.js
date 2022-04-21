const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    const Skills = require('./skills');
    return {
      skills: {
        relation: Model.ManyToManyRelation,
        modelClass: Skills,
        join: {
          from: 'users.id',
          through: {
            from: "users_skills.userId",
            to: "users_skills.skillId"
          },
          to: 'skills.id'
        }
      }
    }
  }
}

module.exports = User;
