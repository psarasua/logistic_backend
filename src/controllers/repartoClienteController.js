const repartoClienteModel = require('../models/repartoClienteModel');

// Agregar cliente a un reparto
const addCliente = async (req, res) => {
  try {
    const { reparto_id, cliente_id } = req.body;
    if (Array.isArray(cliente_id)) {
      for (const cid of cliente_id) {
        await repartoClienteModel.addClienteToReparto(reparto_id, cid);
      }
      res.json({ success: true, message: 'Clientes agregados al reparto', clientes: cliente_id });
    } else {
      await repartoClienteModel.addClienteToReparto(reparto_id, cliente_id);
      res.json({ success: true, message: 'Cliente agregado al reparto', cliente: cliente_id });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Eliminar cliente de un reparto
const removeCliente = async (req, res) => {
  try {
    const { reparto_id, cliente_id } = req.body;
    await repartoClienteModel.removeClienteFromReparto(reparto_id, cliente_id);
    res.json({ success: true, message: 'Cliente eliminado del reparto' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Obtener clientes de un reparto
const getClientes = async (req, res) => {
  try {
    const { reparto_id } = req.params;
    const clientes = await repartoClienteModel.getClientesByReparto(reparto_id);
    res.json({ success: true, data: clientes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Obtener repartos de un cliente
const getRepartos = async (req, res) => {
  try {
    const { cliente_id } = req.params;
    const repartos = await repartoClienteModel.getRepartosByCliente(cliente_id);
    res.json({ success: true, data: repartos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  addCliente,
  removeCliente,
  getClientes,
  getRepartos
};
