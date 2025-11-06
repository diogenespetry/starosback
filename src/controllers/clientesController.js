const Clientes = require("../models/clientesModel");
const Cliente  = require("../models/clientesModel");

const createClientes = async (req, res) => {
  const { nome, description,telefone,email } = req.body;

  if (!nome || !description) {
    return res
      .status(400)
      .send({ error: "Nome e descrição são obrigatórios" });
  }

  try {
    await Cliente.query().insert({
      nome,
      description,
      telefone,
      email,
    });
    return res.status(201).send();
  } catch (error) {
    console.error("Erro ao criar cliente:", error);
    return res.status(500).send({ error: "Erro interno do servidor" });
  }
};

const listClientes = async (req, res) => {
  try {
    const  clientes = await Cliente.query();
    return res.status(200).send(clientes);
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
    return res.status(500).send({ error: "Erro interno do servidor" });
  }
};

const atualizarCliente = async (req, res) => {
  const { nome, description, email, telefone } = req.body;

  try {
    await Cliente.query().findById(req.params.id).patch({ nome, email, telefone, description });
    return res.status(200).send({ message: "Cliente atualizado com sucesso." });
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    return res.status(500).send({ error: "Erro interno do servidor" });
  }
};

const getClienteById = async (req, res) => {
 const { id } = req.params;

  try {
    const cliente = await Clientes.query().findById(id);

    if (!cliente) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }

    res.status(200).json(cliente);
  } catch (error) {
    console.error('Erro ao buscar ticket por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
module.exports = { createClientes, listClientes, atualizarCliente, getClienteById };
