import base from './base.js'

const endpoint = '/libro';

const findAll = async () => await base.get(endpoint);

const create = async (payload) => await base.post(endpoint, payload)

const api = { findAll, create }

export default api;