const sqliteConnection = require("../../database/sqlite");
const AppError = require("../utils/AppError");

class AlunoController {
  async create(req, res) {
    const {
      nome,
      idade,
      notaPrimeiroSemestre,
      notaSegundoSemestre,
      professor,
      numeroDaSala,
    } = req.body;

    const database = await sqliteConnection();
    const checkUserExist = await database.get(
      "SELECT * FROM alunos WHERE nome = (?)",
      [nome]
    );
    if (checkUserExist) {
      return res.status(400).json({
        message: "Aluno já criado",
        statusCode: "Bad Request (400)",
      });
    }

    await database.run(
      "INSERT INTO alunos (nome, idade, notaPrimeiroSemestre, notaSegundoSemestre, professor, numeroDaSala) VALUES (?, ?, ?, ?, ?, ?)",
      [
        nome,
        idade,
        notaPrimeiroSemestre,
        notaSegundoSemestre,
        professor,
        numeroDaSala,
      ]
    );
    return res.status(201).json();
  }

  async update(req, res) {
    const {
      nome,
      idade,
      notaPrimeiroSemestre,
      notaSegundoSemestre,
      professor,
      numeroDaSala,
    } = req.body;

    const { id } = req.params;

    const database = await sqliteConnection();
    const aluno = await database.get("SELECT * FROM alunos WHERE id = (?)", [
      id,
    ]);

    if (!aluno) {
      return res.status(400).json({
        message: "Aluno ainda nao foi criado",
        statusCode: "Bad Request (400)",
      });
    }

    const userWithUpdateNome = await database.get(
      "SELECT * FROM alunos WHERE nome =(?)",
      [nome]
    );

    if (userWithUpdateNome && userWithUpdateNome.id !== id) {
      return res.status(400).json({
        message: "Nome já existe",
        statusCode: "Bad Request (400)",
      });
    }

    aluno.nome = nome;
    aluno.idade = idade;
    aluno.notaPrimeiroSemestre = notaPrimeiroSemestre;
    aluno.notaSegundoSemestre = notaSegundoSemestre;
    aluno.professor = professor;
    aluno.numeroDaSala = numeroDaSala;

    await database.run(
      `UPDATE or IGNORE alunos SET
    nome = ?,
    idade = ?,
    notaPrimeiroSemestre = ?,
    notaSegundoSemestre = ?,
    professor = ?,
    numeroDaSala = ?
    WHERE id = ?
`,
      [
        aluno.nome,
        aluno.idade,
        aluno.notaPrimeiroSemestre,
        aluno.notaSegundoSemestre,
        aluno.professor,
        aluno.numeroDaSala,
        id,
      ]
    );

    return res.status(200).json();
  }

  async delete(req, res) {
    const { id } = req.params;

    const database = await sqliteConnection();
    await database.run("DELETE FROM alunos WHERE id =(?)", [id]);

    return res.status(200).json({});
  }

  async show(req, res) {
    const { id } = req.params;

    const database = await sqliteConnection();
    const alunosInd = await database.get(
      "SELECT * FROM alunos WHERE id = (?)",
      [id]
    );

    return res.status(200).json({
      ...alunosInd,
    });
  }
}

module.exports = AlunoController;
