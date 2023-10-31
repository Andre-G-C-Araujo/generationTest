const express = require("express");
const cors = require("cors");
const migrationsRun = require("../database/sqlite/migrations");

const AlunoController = require("./AlunoController");
const alunoController = new AlunoController();

const app = express();
app.use(cors());
app.use(express.json());

migrationsRun();

const PORT = 3334;

app.post("/", alunoController.create);
app.get("/:id", alunoController.show);
app.put("/:id", alunoController.update);
app.delete("/:id", alunoController.delete);

app.listen(PORT, () => console.log("Hello World"));
