/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }Skill
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("skills", (table) => {
      table.increments();
      table.string("skill").notNullable().unique();
    })
    .createTable("roles", (table) => {
      table.increments();
      table.string("role").notNullable().unique();
    })
    .createTable("users_skills", (table) => {
        table.increments('id').primary();
        table.integer('userId').references('id').inTable('users');
        table.integer('skillId').references('id').inTable('skills')
    })
    .alterTable('users', (table) => {
      table.integer('roleId').references('id').inTable('roles');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable('users', (table) => {
      table.dropColumn('roleId');
    })
    .dropTableIfExists("users_skills")
    .dropTableIfExists("skills")
    .dropTableIfExists("roles")
};
