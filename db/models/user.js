const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    const Skills = require("./skills");
    const Role = require("./roles");
    const Department = require("./department");
    const Events = require("./event");
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
      events: {
        relation: Model.ManyToManyRelation,
        modelClass: Events,
        join: {
          from: "users.id",
          through: {
            from: "participantsOfEvents.userId",
            to: "participantsOfEvents.eventId",
          },
          to: "events.id",
        },
      },
      department: {
        relation: Model.HasOneRelation,
        modelClass: Department,
        join: {
          from: "users.departmentId",
          to: "department.id",
        },
      },
    };
  }
}

module.exports = User;
