const { Model } = require("objection");

class Department extends Model {
  static get tableName() {
    return "department";
  }
}

module.exports = Department;
