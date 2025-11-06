const express = require("express");
const router = express.Router();
const clientesController = require("../controllers/clientesController");

router.post("/", clientesController.createClientes);
router.get("/", clientesController.listClientes);
router.get("/:id", clientesController.getClienteById);
router.put("/:id", clientesController.atualizarCliente);


module.exports = router;
