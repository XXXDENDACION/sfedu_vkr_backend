const User = require("../db/models/user");
const Skill = require("../db/models/skills");
const Role = require("../db/models/roles");
const Departments = require("../db/models/department");

module.exports = {
  getAll: async (req, res) => {
    try {
      const users = await User.query();
      res.json(users);
    } catch (err) {
      console.error(err);
      res.status(500);
    }
  },

  getFilters: async (req, res) => {
    try {
      const { companyId } = req.params;
      const skills = await Skill.query();
      const roles = await Role.query();
      const departments = await Departments.query().where({
        companyId
      }).select('id', 'name');
      res.json({
        skills,
        roles,
        departments
      })
    } catch (err) {
      console.error(err);
    }
  },

  getEmployeeFromCompany: async (req, res) => {
    try {
      console.log("TEST");
      const { companyId } = req.params;
      const { skillId, roleId, departmentId } = req.body;

      const filterParameters = {
        skillId,
        roleId,
        departmentId
      };

      Object.keys(filterParameters).forEach(key => (
        !filterParameters[key] ? delete filterParameters[key] : {}
      ))

      const users = await User.query()
        .where({
          companyId: companyId,
          isEmployee: true,
        })
        .where(filterParameters)
        .select("id", "firstName", "lastName", "position", "age");

      res.json(users);
    } catch (err) {
      console.log(err);
      res.status(500);
    }
  },

  addUp: async (req, res) => {
    try {
      const { firstName, lastName, email, photo, isEmployee, roleId, skills } = req.body;
      const isExist = (await User.query().where("email", email)).length;
      if (!!isExist) {
        return res.json("Email is already exist");
      }
      const user = await User.relatedQuery('skills').for(skills).insert({
        firstName,
        lastName,
        email,
        photo,
        isEmployee,
        roleId
      });

      res.json(user);
    } catch (e) {
      console.error(e);
      res.json(e);
    }
  },

  patchUp: async (req, res) => {
    try {
      const { id, ...rest } = req.body;
      const patchedUser = await User.query().patchAndFetchById(id, {
        ...rest,
      });
      res.json(patchedUser);
    } catch (e) {
      console.error(e);
      res.status(500);
    }
  },
};
