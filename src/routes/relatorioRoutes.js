// src/routes/relatorioRoutes.js
const express = require('express');
const router = express.Router();
const relatorioController = require('../controllers/relatorioController');

// GET /relatorios?nome=João&status=aberto&dataInicio=2025-10-01&dataFim=2025-10-06
router.get('/', relatorioController.filtrarTickets);

module.exports = router;
