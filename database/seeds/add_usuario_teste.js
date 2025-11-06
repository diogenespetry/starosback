exports.seed = function (knex) {
  const dados = [
    {
      id: 1,
      name: "Mateus",
      email: "mateus@star.psi.br",
      senha: "$2b$08$iAIERnn/Iv2HCQa3fUClR./BZde0BFAGy9fBTiK9GiiniHI/7FTGa",
      access_level: "ADM"
    }
  ];
  return knex("usuarios").insert(dados).onConflict("Id").ignore();
};
