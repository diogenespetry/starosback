const validate = (schema) => (req, res, next) => {
  try {
    if (schema.body) {
      schema.body.parse(req.body);
    }
    if (schema.params) {
      schema.params.parse(req.params);
    }
    if (schema.query) {
      schema.query.parse(req.query);
    }
    next();
  } catch (error) {
    const errorMessage = error?.issues?.[0] ?? { message: error?.message ?? "Erro de validação" };
    res.status(400).json(errorMessage);
  }
};

module.exports = validate;
