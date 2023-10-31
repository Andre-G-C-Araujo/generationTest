const sqliteConnection = require("../../sqlite");
const createtableAluno = require("./createAlunos");

async function migrationsRun() {
  const schemas = [createtableAluno].join("");

  sqliteConnection()
    .then((db) => db.exec(schemas))
    .catch((error) => console.error(error));
}

module.exports = migrationsRun;
