const express = require("express");
const router = express.Router();
const ticketController = require("../controllers/ticketController");
const { verifyJWT } = require("@/middleware/Validajwt");

router.post("/", verifyJWT, ticketController.createTicket);
router.get("/", verifyJWT, ticketController.listTicket);
router.put("/:id", verifyJWT, ticketController.atualizar);
router.get("/:id", verifyJWT, ticketController.getTicketById);
router.get("/status/:status", verifyJWT, ticketController.getTicketsByStatus);
router.get("/:id/interacoes", verifyJWT, ticketController.getInteracoesPorTicket);
router.post("/:id/interacoes", verifyJWT, ticketController.adicionarInteracao);

module.exports = router;
