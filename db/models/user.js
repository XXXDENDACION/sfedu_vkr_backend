const { Model } = require("objection");
const Role = require("./roles");

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    const Skills = require("./skills");
    return {
      role: {
        relation: Model.HasOneRelation,
        modelClass: Role,
        join: {
          from: "users.roleId",
          to: "roles.id",
        },
      },
      skills: {
        relation: Model.ManyToManyRelation,
        modelClass: Skills,
        join: {
          from: "users.id",
          through: {
            from: "users_skills.userId",
            to: "users_skills.skillId",
          },
          to: "skills.id",
        },
      },
    };
  }
}

module.exports = User;
