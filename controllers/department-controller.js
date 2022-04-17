const Company = require("../db/models/company");
const Department = require("../db/models/department");

module.exports = {
  createDepartment: async (req, res) => {
    try {
      const { name, companyId } = req.body;
      const isHasCompanyId = (await Company.query().where({ id: companyId }))
        .length;

      if (!isHasCompanyId) {
        return res.json("Company have not exist");
      }

      const department = await Department.query().insert({
        name: name,
        companyId: companyId,
      });
      res.json(department);
    } catch (e) {
      console.error(e);
      res.json(e);
      res.status(500);
    }
  },
};
