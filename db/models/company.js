const { Model } = require("objection");

class Company extends Model {
  static get tableName() {
    return "company";
  }

  static get relationMappings() {
    const Department = require("./department");
    const User = require("./user");
    return {
      departments: {
        relation: Model.HasManyRelation,
        modelClass: Department,
        join: {
          from: "company.id",
          to: "department.companyId",
        },
      },
      ownerId: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "company.userId",
          to: "users.id"
        }
      }
    };
  }
}

module.exports = Company;
