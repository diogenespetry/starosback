const { Ticket } = require("../models/ticketModel");
const { TicketInteracao } = require("../models/interacaoTicketModel");
const db = require("../config/db").knex;

const createTicket = async (req, res) => {
  const { title, description, cliente_id } = req.body;
  const { id: id_usuario } = req.user.usuario;

  if (!title || !description) {
    return res.status(400).send({ error: "Título e descrição são obrigatórios" });
  }

  try {
    await Ticket.query().insert({ title, description, cliente_id, usuario_id: id_usuario });
    return res.status(201).send();
  } catch (error) {
    console.error("Erro ao criar ticket:", error);
    return res.status(500).send({ error: "Erro interno do servidor" });
  }
};

const listTicket = async (req, res) => {
  try {
    const { cliente_id } = req.query;

    let query = Ticket.query()
      .orderBy("id", "desc")
      .withGraphFetched("[status_ticket,cliente,usuario]")
      .modifyGraph("usuario", (builder) => {
        builder.select("id", "name");
      });

    if (cliente_id) {
      query = query.where("cliente_id", cliente_id);
    }

    const tickets = await query;
    return res.status(200).send(tickets);
  } catch (error) {
    console.error("Erro ao listar tickets:", error);
    return res.status(500).send({ error: "Erro interno do servidor" });
  }
};

const atualizar = async (req, res) => {
  const id = req.params.id;
  const { title, description, cliente_id } = req.body;

  try {
    const ticketAntigo = await Ticket.query().findById(id);
    if (!ticketAntigo) {
      return res.status(404).json({ error: "Ticket não encontrado" });
    }

    await Ticket.query().findById(id).patch({ title, description, cliente_id });

    return res.status(200).send({ message: "Ticket atualizado" });
  } catch (err) {
    console.error("Erro ao atualizar ticket:", err);
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
};

const getTicketById = async (req, res) => {
  const { id } = req.params;

  try {
    const ticket = await Ticket.query().findById(id).withGraphFetched("[status_ticket, cliente]");

    if (!ticket) {
      return res.status(404).json({ error: "Ticket não encontrado" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    console.error("Erro ao buscar ticket por ID:", error.message, error.stack);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
};

const getTicketsByStatus = async (req, res) => {
  const { status } = req.params;

  try {
    const tickets = await Ticket.query().where("status", status);
    return res.status(200).send(tickets);
  } catch (error) {
    console.error("Erro ao buscar tickets por status:", error);
    return res.status(500).send({ error: "Erro interno do servidor" });
  }
};

const getInteracoesPorTicket = async (req, res) => {
  const { id } = req.params;

  try {
    const interacoes = await db("ticket_interacao")
      .select(
        "ticket_interacao.*",
        "usuarios.name as usuario_nome",
        "status_tickets.name as status_nome"
      )
      .leftJoin("usuarios", "ticket_interacao.user_id", "usuarios.id")
      .leftJoin("status_tickets", "ticket_interacao.status_id", "status_tickets.id")
      .where("ticket_id", id)
      .orderBy("date", "asc");

    res.json(interacoes);
  } catch (error) {
    console.error("Erro ao buscar interações:", error);
    res.status(500).json({ error: "Erro ao buscar interações" });
  }
};

const adicionarInteracao = async (req, res) => {
  const { id } = req.params;
  const { description, status_id } = req.body;
  const { id: id_usuario } = req.user.usuario;

  if (!status_id) {
    return res.status(400).send({
      message: "Description, status_id  são obrigatórios"
    });
  }

  try {
    const ticket = await Ticket.query().findById(id);

    if (!ticket) {
      return res.status(404).send({ message: "Ticket não encontrado" });
    }

    if ((ticket.status === 4 || ticket.status === 6) && status_id !== 5) {
      return res.status(400).send({
        message: "Tickets encerrados ou cancelados só podem ser reabertos."
      });
    }

    const novaInteracao = await TicketInteracao.query().insert({
      description,
      ticket_id: parseInt(id),
      user_id: parseInt(id_usuario),
      status_id: parseInt(status_id)
    });

    await Ticket.query().findById(id).patch({ status: status_id });

    res.status(201).json({
      message: "Interação adicionada com sucesso",
      interacao: novaInteracao
    });
  } catch (error) {
    console.error("Erro ao adicionar interação:", error);
    res.status(500).send({ message: "Erro interno do servidor" });
  }
};

module.exports = {
  createTicket,
  listTicket,
  atualizar,
  getTicketById,
  getTicketsByStatus,
  getInteracoesPorTicket,
  adicionarInteracao
};
