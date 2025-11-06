const { z } = require("zod");

const Cadastrar = z.object({
  name: z.string().trim().min(2),
  email: z.email(),
  senha: z.string().trim().min(8),
  access_level: z.enum(["ADM", "USER"])
});

const Editar = z.object({
  name: z.string().trim().min(2),
  email: z.email(),
  senha: z.string().trim().min(8).optional(),
  access_level: z.enum(["ADM", "USER"])
});

const Login = z.object({
  email: z.email(),
  senha: z.string().trim().min(8)
});

module.exports = {
  Cadastrar,
  Editar,
  Login
};
