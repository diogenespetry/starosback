const express = require("express");
const router = express.Router();
const { knex } = require("../config/db");
const statusController = require("../controllers/statusController");

// Listar todos os tickets com determinado status
router.get("/tickets/:statusNome", async (req, res) => {
  const { statusNome } = req.params;

  try {
    const tickets = await knex("tickets")
      .join("status", "tickets.status_id", "status.id")
      .where("status.nome", statusNome)
      .select("tickets.*"); // ou selecione os campos que quiser

    res.json(tickets);
  } catch (error) {
    console.error("Erro ao buscar tickets por status:", error);
    res.status(500).json({ error: "Erro ao buscar tickets por status" });
  }
});

router.get("/", statusController.listStatus);

module.exports = router;
