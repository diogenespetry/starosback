const { Usuario } = require("@/models/usuariosModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  Login: async function (req, res) {
    try {
      const { email, senha } = req.body;

      const usuario = await Usuario.query().findOne({ email });

      if (!usuario) {
        return res.status(404).send({ message: "Usuario nao localizado!" });
      }

      const passwordIsValid = bcrypt.compareSync(senha, usuario.senha);

      if (!passwordIsValid) {
        return res.status(400).send({
          message: "Combinação de usuario e senha inválida!"
        });
      }

      const secret = process.env.SECRET_TOKEN;
      if (!secret) {
        return res.status(500).send("Você deve configurar a variável de ambiente SECRET_TOKEN!");
      }

      const usuarioSemSenha = { ...usuario };
      delete usuarioSemSenha.senha;

      const token = jwt.sign({ usuario: usuarioSemSenha }, secret, {
        expiresIn: 604800
      });

      return res.status(200).send({ token, usuario: usuarioSemSenha });
    } catch (error) {
      return res.status(error.statusCode || 500).send({ message: error.message });
    }
  },

  Cadastrar: async function (req, res) {
    const { name, email, senha, access_level } = req.body;

    try {
      const usuarioExistente = await Usuario.query().findOne({ email });
      if (usuarioExistente) {
        return res.status(409).send({ error: "Usuário já existe" });
      }

      await Usuario.query().insert({
        name,
        email,
        senha: bcrypt.hashSync(senha, 8),
        access_level
      });

      return res.status(201).send();
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      return res.status(500).send({ error: "Erro interno no servidor" });
    }
  },

  Editar: async function (req, res) {
    const { id } = req.params;
    const { name, email, senha, access_level } = req.body;

    try {
      const usuarioExistente = await Usuario.query().findById(id);
      if (!usuarioExistente) {
        return res.status(404).send({ error: "Usuário não existe" });
      }

      const dadosAtualizados = { name, email, access_level };

      if (senha) {
        dadosAtualizados.senha = bcrypt.hashSync(senha, 8);
      }

      await usuarioExistente.$query().patch(dadosAtualizados);

      return res.status(200).send();
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
      return res.status(500).send({ error: "Erro interno no servidor" });
    }
  },

  ListarUsuarios: async function (req, res) {
    try {
      const usuarios = await Usuario.query();
      return res.status(200).send(usuarios);
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      return res.status(500).send({ error: "Erro interno no servidor" });
    }
  },

  DadosUsuario: async function (request, reply) {
    return reply.status(200).send(request.user);
  },

  GetDadosUsuarioParaEditar: async function (req, res) {
    const { id } = req.params;

    try {
      const usuario = await Usuario.query().findById(id);

      if (!usuario) {
        return res.status(404).send({ error: "Usuário não encontrado" });
      }

      const usuarioSemSenha = { ...usuario };
      delete usuarioSemSenha.senha;

      return res.status(200).send(usuarioSemSenha);
    } catch (error) {
      console.error("Erro ao buscar usuário por ID:", error);
      return res.status(500).send({ message: "Erro interno do servidor" });
    }
  }
};
