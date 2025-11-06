const Relatorio = require('../models/relatorioModel');
// src/controllers/relatorioController.js
exports.filtrarTickets = async (req, res) => {
  try {
    const { nome, status, dataInicio, dataFim } = req.query;

    const query = await Relatorio.query()
      .join('tickets', 'relatorios.ticket_id', 'tickets.id')
      .join('clientes', 'tickets.cliente_id', 'clientes.id') // 👈 ALTERADO AQUI
      .select(
        'clientes.nome as cliente',
        'tickets.title as ticket_titulo',
        'tickets.status',
        'tickets.data_created',
        'relatorios.titulo as relatorio_titulo',
        'relatorios.descricao'
      )
      .modify((qb) => {
        if (nome) qb.where('clientes.nome', 'like', `%${nome}%`);
        if (status) qb.where('tickets.status', status);
        if (dataInicio && dataFim) qb.whereBetween('tickets.data_created', [dataInicio, dataFim]);
        else if (dataInicio) qb.where('tickets.data_created', '>=', dataInicio);
        else if (dataFim) qb.where('tickets.data_created', '<=', dataFim);
      });

    res.json(query);
  } catch (error) {
    console.error('Erro ao gerar relatório:', error);
    res.status(500).json({ message: 'Erro ao gerar relatório', error });
  }
};
