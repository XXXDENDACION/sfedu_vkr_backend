const mysql = require('mysql2');
const knex = require('knex');
const knexfile = require('./knexfile');

const db = knex(knexfile.development);

module.exports = db;