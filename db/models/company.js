const { Model } = require("objection");

class Company extends Model {
  static get tableName() {
    return "company";
  }

  static get relationMappings() {
    const Department = require("./department");
    return {
      departments: {
        relation: Model.HasManyRelation,
        modelClass: Department,
        join: {
          from: "company.id",
          to: "department.companyId",
        },
      },
    };
  }
}

module.exports = Company;
