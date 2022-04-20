const { Model } = require("objection");

class Department extends Model {
  static get tableName() {
    return "department";
  }

  static get relationMappings() {
    const Company = require("./company");
    return {
      departments: {
        relation: Model.HasOneRelation,
        modelClass: Company,
        join: {
          from: "department.companyId",
          to: "company.id",
        },
      },
    };
  }
}

module.exports = Department;
