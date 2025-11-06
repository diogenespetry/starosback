const login = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: "Email e senha são obrigatórios." });
  }

  try {
    const usuario = await Usuario.query().findOne({ email });

    if (!usuario) {
      return res.status(404).send({ message: "Usuário não encontrado." });
    }

    return res.status(200).send(usuario);
  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).send({ message: "Erro interno do servidor" });
  }
};

module.exports = { login };
