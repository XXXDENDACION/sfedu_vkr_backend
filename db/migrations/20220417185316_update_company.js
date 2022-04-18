/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("calendar", (table) => {
      table.increments();
      table.timestamps(true, true);
    })
    .alterTable("company", (table) => {
      table.integer("calendarId").references("id").inTable("calendar");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .alterTable("company", (table) => {
      table.dropColumn("calendarId");
    })
    .dropTableIfExists("calendar");
};
