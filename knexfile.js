// Update with your config settings.

const path = require("path");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: path.dirname(__dirname, "src", "database", "database.db"),
    },
    useNullAsDefault: true,
  },
};
