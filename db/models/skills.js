const { Model } = require("objection");

class Skill extends Model {
  static get tableName() {
    return "skills";
  }

  static get relationMappings() {
    const User = require("./user");
    return {
      users: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: "skills.id",
          through: {
            from: "users_skills.skillId",
            to: "users_skills.userId",
          },
          to: "users.id",
        },
      },
    };
  }
}

module.exports = Skill;
