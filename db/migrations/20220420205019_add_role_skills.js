/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
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
    .alterTable("users", (table) => {
      table.integer("roleId").references("id").inTable("roles");
      table.integer("skillId").references("id").inTable("skills");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("users", (table) => {
      table.dropColumn("roleId");
      table.dropColumn("skillId");
    })
    .dropTableIfExists("skills")
    .dropTableIfExists("roles");
};
