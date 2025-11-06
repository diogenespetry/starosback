const { Status } = require("../models/statusModel");

// ✅ Listar todos os status
const listStatus = async (req, res) => {
  try {
    const status = await Status.query();
    res.status(200).json(status);
  } catch (error) {
    console.error("Erro ao listar status:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

// ✅ Criar um novo status
const createStatus = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Nome do status é obrigatório" });
  }

  try {
    const newStatus = await Status.query().insert({ name });
    res.status(201).json(newStatus);
  } catch (error) {
    console.error("Erro ao criar status:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

module.exports = { listStatus, createStatus };
