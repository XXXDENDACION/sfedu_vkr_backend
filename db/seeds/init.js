const generateName = require("../name-generator");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex.raw('TRUNCATE TABLE "users" CASCADE');
  await knex.raw('TRUNCATE TABLE "company" CASCADE');
  await knex.raw('TRUNCATE TABLE "skills" CASCADE');
  await knex.raw('TRUNCATE TABLE "roles" CASCADE');
  await knex.raw('TRUNCATE TABLE "departments" CASCADE');
  await knex.raw('TRUNCATE TABLE "users_skills" CASCADE');

  // Deletes ALL existing entries
  await knex("skills").insert([
    {
      id: 1,
      skill: "JS",
    },
    {
      id: 2,
      skill: "CSS",
    },
    {
      id: 3,
      skill: "React",
    },
  ]);

  await knex("roles").insert([
    {
      id: 1,
      role: "Lead",
    },
    {
      id: 2,
      role: "FrontEnd",
    },
    {
      id: 3,
      role: "BackEnd",
    },
  ]);

  await knex("company").insert([
    {
      id: 1,
      name: "Umnico",
    },
  ]);

  await knex("department").insert([
    {
      id: 1,
      name: "Main",
      companyId: 1,
    },
    {
      id: 2,
      name: "Client's developers",
      companyId: 1,
    },
    {
      id: 3,
      name: "Tester's department",
      companyId: 1,
    },
  ]);

  const user = {
    firstName: "Denis",
    lastName: "Smirnov",
    age: 22,
    isEmployee: true,
    email: "den@test.ru",
    roleId: 1,
    departmentId: 1,
    companyId: 1,
  };

  const users = Array.from(Array(25).keys()).map((i) => ({
    ...user,
    firstName: generateName(),
    lastName: generateName(),
    email: user.email + (Math.random() * 100).toFixed(2),
  }));

  await knex("users").insert([
    {
      id: 1,
      firstName: "Denis",
      lastName: "Smirnov",
      age: 22,
      isEmployee: false,
      email: "den@test.ru",
      roleId: 1,
      departmentId: 1,
      companyId: 1,
    },
    {
      id: 2,
      firstName: "Pavel",
      lastName: "Chulanov",
      age: 21,
      isEmployee: true,
      email: "pabel@test.ru",
      roleId: 2,
      departmentId: 1,
      companyId: 1,
    },
    {
      id: 3,
      firstName: "Alexey",
      lastName: "Smirnov",
      age: 34,
      isEmployee: true,
      email: "test@test.ru",
      roleId: 3,
      departmentId: 1,
      companyId: 1,
    },
    {
      id: 4,
      firstName: "Daniil",
      lastName: "Korpusev",
      age: 44,
      isEmployee: true,
      email: "daniil@test.ru",
      roleId: 2,
      departmentId: 2,
      companyId: 1,
    },
    {
      id: 5,
      firstName: "Igor",
      lastName: "Ivanov",
      age: 14,
      isEmployee: true,
      email: "igor@test.ru",
      roleId: 3,
      departmentId: 2,
      companyId: 1,
    },
    {
      id: 6,
      firstName: "Denis",
      lastName: "Ivanov",
      age: 22,
      isEmployee: true,
      email: "dena@test.ru",
      roleId: 2,
      departmentId: 2,
      companyId: 1,
    },
    ...users,
  ]);

  await knex("users_skills").insert([
    {
      userId: 1,
      skillId: 3,
    },
    {
      userId: 1,
      skillId: 2,
    },
    {
      userId: 1,
      skillId: 1,
    },
    {
      userId: 2,
      skillId: 1,
    },
    {
      userId: 3,
      skillId: 1,
    },
    {
      userId: 3,
      skillId: 2,
    },
    {
      userId: 4,
      skillId: 1,
    },
    {
      userId: 5,
      skillId: 3,
    },
  ]);
};
