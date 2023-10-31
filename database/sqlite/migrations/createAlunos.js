const createAluno = `
CREATE TABLE IF NOT EXISTS alunos (
id INTEGER PRIMARY KEY AUTOINCREMENT,
nome VARCHAR,
idade VARCHAR,
notaPrimeiroSemestre VARCHAR,
notaSegundoSemestre VARCHAR,
professor VARCHAR,
numeroDaSala VARCHAR
)
`;
module.exports = createAluno;
