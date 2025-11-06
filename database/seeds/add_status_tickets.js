exports.seed = function (knex) {
  const ticket_status = [
    {
      id: 1,
      name: "Aberto"
    },
    {
      id: 2,
      name: "Em execução"
    },
    {
      id: 3,
      name: "Aguardando cliente"
    },
    {
      id: 4,
      name: "Encerrado"
    },
    {
      id: 5,
      name: "Reaberto"
    },
    {
      id: 6,
      name: "Cancelado"
    }
  ];
  return knex("status_tickets").insert(ticket_status).onConflict("id").ignore();
};
