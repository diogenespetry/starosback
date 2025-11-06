const express = require("express");
const router = express.Router();
const constroller = require("@/controllers/usuariosController");

const { Cadastrar, Editar, Login } = require("@/middleware/schemas/usuarios.schema");
const validate = require("@/middleware/Validate");
const { verifyJWT } = require("@/middleware/Validajwt");

router.post("/", verifyJWT, validate({ body: Cadastrar }), constroller.Cadastrar);
router.patch("/:id", verifyJWT, validate({ body: Editar }), constroller.Editar);
router.get("/", verifyJWT, constroller.ListarUsuarios);
router.post("/login", validate({ body: Login }), constroller.Login);
router.get("/dados-usuario", verifyJWT, constroller.DadosUsuario);
router.get("/:id", verifyJWT, constroller.GetDadosUsuarioParaEditar);

module.exports = router;
