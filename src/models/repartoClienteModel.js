const { query } = require('../config/database');

// Agregar cliente a un reparto
const addClienteToReparto = async (reparto_id, cliente_id) => {
  await query('INSERT INTO reparto_cliente (reparto_id, cliente_id) VALUES ($1, $2)', [reparto_id, cliente_id]);
};

// Eliminar cliente de un reparto
const removeClienteFromReparto = async (reparto_id, cliente_id) => {
  await query('DELETE FROM reparto_cliente WHERE reparto_id = $1 AND cliente_id = $2', [reparto_id, cliente_id]);
};

// Obtener clientes de un reparto
const getClientesByReparto = async (reparto_id) => {
  const result = await query(
    'SELECT c.* FROM reparto_cliente rc JOIN clientes c ON rc.cliente_id = c.id WHERE rc.reparto_id = $1',
    [reparto_id]
  );
  return result.rows;
};

// Obtener repartos de un cliente
const getRepartosByCliente = async (cliente_id) => {
  const result = await query(
    'SELECT r.* FROM reparto_cliente rc JOIN repartos r ON rc.reparto_id = r.id WHERE rc.cliente_id = $1',
    [cliente_id]
  );
  return result.rows;
};

module.exports = {
  addClienteToReparto,
  removeClienteFromReparto,
  getClientesByReparto,
  getRepartosByCliente
};
