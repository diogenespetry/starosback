require("module-alias/register");
const express = require("express");
const cors = require("cors");
const ticketRoutes = require("./src/routes/ticketRoutes");
const clientesRoutes = require("./src/routes/clientesRoutes");
const { knex } = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const usuariosRoutes = require("./src/routes/usuariosRoutes");
const statusRoutes = require("./src/routes/statusRoutes");
const relatorioRoutes = require("./src/routes/relatorioRoutes");
const estatisticasRoutes = require("./src/routes/estatisticasRoutes");

const server = express();
server.use(express.json());
server.use(cors());

server.use("/tickets", ticketRoutes);
server.use("/clientes", clientesRoutes);
server.use("/usuarios", usuariosRoutes);
server.use("/auth", authRoutes);
server.use("/status_tickets", statusRoutes);
server.use("/relatorios", relatorioRoutes);
server.use("/estatisticas", estatisticasRoutes);

server.get("/ping", (req, res) => {
  res.send("pong");
});

// Servir arquivos estáticos do frontend
server.use("/", express.static("data/frontend/"));

const startServer = async () => {
  try {
    await knex.raw("SELECT 1+1 as result");
    console.log("BANCO DE DADOS CONECTADO COM SUCESSO!");

    server.listen(4000, () => {
      console.log("Servidor iniciado na porta: 4000!");
    });
  } catch (error) {
    console.error("ERRO AO CONECTAR AO BANCO DE DADOS:", error);
    process.exit(1);
  }
};

startServer();
