const { Model } = require("objection");

class Department extends Model {
  static get tableName() {
    return "department";
  }

  static get modifiers() {
    return {
      selectMainFields(builder) {
        builder.select("id", "name");
      },
    };
  }

  static get relationMappings() {
    const User = require("./user");
    return {
      members: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: "department.id",
          to: "users.departmentId",
        },
      },
    };
  }
}

module.exports = Department;
