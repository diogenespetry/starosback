const { Ticket } = require("../models/ticketModel");
const Clientes = require("../models/clientesModel");
const { Usuario } = require("../models/usuariosModel");
const db = require("../config/db").knex;

module.exports = {
  getEstatisticas: async (req, res) => {
    try {
      const totalTickets = await Ticket.query().count("id as total").first();
      const totalTicketsAtivos = await Ticket.query()
        .whereNotIn("status", [4, 6])
        .count("id as total")
        .first();
      const totalClientes = await Clientes.query().count("id as total").first();
      const totalUsuarios = await Usuario.query().count("id as total").first();

      return res.status(200).send({
        totalTickets: Number(totalTickets.total),
        totalTicketsNaoEncerradosOuCancelados: Number(totalTicketsAtivos.total),
        totalClientes: Number(totalClientes.total),
        totalUsuarios: Number(totalUsuarios.total)
      });
    } catch (error) {
      console.error("Erro ao obter estatísticas:", error);
      return res.status(500).send({ message: "Erro interno do servidor" });
    }
  }
};

module.exports.getTicketsPorStatus = async (req, res) => {
  try {
    const dados = await Ticket.query()
      .leftJoin("status_tickets", "tickets.status", "status_tickets.id")
      .select("status_tickets.id as status_id", "status_tickets.name as status_nome")
      .count("tickets.id as total")
      .groupBy("status_tickets.id", "status_tickets.name")
      .orderBy("status_tickets.id", "asc");

    const resposta = dados.map((d) => ({
      status_id: d.status_id,
      status_nome: d.status_nome,
      total: Number(d.total)
    }));

    return res.status(200).send(resposta);
  } catch (error) {
    console.error("Erro ao obter tickets por status:", error);
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
};

module.exports.getTicketsUltimos7Dias = async (req, res) => {
  try {
    const dados = await db("tickets")
      .select(db.raw("DATE_FORMAT(data_created, '%Y-%m-%d') as dia"))
      .count("id as total")
      .whereRaw("data_created >= DATE_SUB(CURDATE(), INTERVAL ? DAY)", 7)
      .groupBy("dia")
      .orderBy("dia", "asc");

    const resposta = dados.map((d) => ({ dia: d.dia, total: Number(d.total) }));

    return res.status(200).send(resposta);
  } catch (error) {
    console.error("Erro ao obter tickets por dia:", error);
    return res.status(500).send({ error: "Erro interno do servidor" });
  }
};
