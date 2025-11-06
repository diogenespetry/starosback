const express = require("express");
const router = express.Router();
const estatisticasController = require("../controllers/estatisticasController");
const { verifyJWT } = require("@/middleware/Validajwt");

router.get("/", verifyJWT, estatisticasController.getEstatisticas);
router.get("/tickets_por_status", verifyJWT, estatisticasController.getTicketsPorStatus);
router.get("/tickets_por_dia", verifyJWT, estatisticasController.getTicketsUltimos7Dias);

module.exports = router;
