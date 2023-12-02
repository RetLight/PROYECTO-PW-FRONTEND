import base from './base.js'

const endpoint = '/usuario';

const findAll = async () => await base.get(endpoint);

const findOne = async (id) => await base.get(`${endpoint}/${id}`);

const create = async (payload) => await base.post(endpoint, payload)

const api = { findAll, create, findOne }

export default api;