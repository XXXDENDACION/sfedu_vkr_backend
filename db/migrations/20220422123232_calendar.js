/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.alterTable("calendar", (table) => {
    table.integer('ownerId').references('id').inTable('users');
  }).createTable("events", (table) => {
    table.increments().primary();
    table.string('title');
    table.string('description');
    table.integer('ownerId').references('id').inTable('users');
    table.integer('calendarId').references('id').inTable('calendar')
  }).createTable("participantsOfEvents", (table) => {
    table.increments();
    table.integer('userId').references('id').inTable('users');
    table.integer('eventId').references('id').inTable('events');
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable("calendar", (table) => {
    table.dropColumn('ownerId');
  }).dropTableIfExists("participantsOfEvents")
    .dropTableIfExists('events');
};
