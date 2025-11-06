const secret = process.env.SECRET_TOKEN;
const jwt = require("jsonwebtoken");

module.exports.verifyJWT = async function (req, res, next) {
  if (!secret) {
    console.error("SECRET_TOKEN não está configurado nas variáveis de ambiente");
    return res.status(500).send({ erro: "Erro de configuração do servidor" });
  }

  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).send({ erro: "Token de acesso não fornecido" });
  }

  try {
    if (!token.startsWith("Bearer ")) {
      return res.status(401).send({ erro: "Formato de token inválido" });
    }

    token = token.split(" ")[1];

    if (token === "null" || !token) {
      return res.status(401).send({ erro: "Token inválido" });
    }

    const verifiedUser = jwt.verify(token, secret);

    req.user = verifiedUser;
    next();
  } catch (error) {
    console.error("Erro na validação do JWT:", error.message);

    if (error.name === "TokenExpiredError") {
      return res.status(401).send({ erro: "Token expirado" });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).send({ erro: "Token inválido" });
    } else if (error.name === "NotBeforeError") {
      return res.status(401).send({ erro: "Token ainda não é válido" });
    }

    return res.status(401).send({ erro: "Falha na autenticação" });
  }
};
