/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("users", (table) => {
    table.string("lastName");
    table.renameColumn("name", "firstName");
    table.integer("age");
    table.integer("companyId").references("id").inTable("company");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("users", (table) => {
    table.dropColumn("lastName");
    table.renameColumn("firstName", "name");
    table.dropColumn("age");
    table.dropColumn("companyId");
  });
};
