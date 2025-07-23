// src/services/apiService.js
import axios from 'axios';

// URL base de tu API (puedes parametrizarla con una env var)
const API_BASE_URL = process.env.API_BASE_URL || 'http://20.42.92.103:3000';

const api = {
  /**
   * Devuelve el listado de productos desde GET /products
   */
  getProducts: async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/products`);
      return data;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw error;
    }
  },

  /**
   * Crea una transacción real vía POST /transactions
   * @param {{ products: any[], card: object, shipping: object, total: number }} payload
   */
  createTransaction: async (payload) => {
    try {
      const { data } = await axios.post(
        `${API_BASE_URL}/transactions`,
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );
      return data; // debe incluir txId, status, etc.
    } catch (error) {
      console.error('Error al crear transacción:', error);
      throw error;
    }
  },

  /**
   * Consulta el estado de la transacción con GET /transactions/:txId
   * @param {string} id  El UUID de la transacción
   * @returns {Promise<object>}  El objeto Transaction completo
   */
  getTransactionStatus: async (id) => {
    try {
      const { data } = await axios.get(
        `${API_BASE_URL}/transactions/${id}`,
        { headers: { 'Content-Type': 'application/json' } }
      );
      return data;
    } catch (error) {
      console.error('Error al obtener estado de transacción:', error);
      throw error;
    }
  },
};


export default api;
