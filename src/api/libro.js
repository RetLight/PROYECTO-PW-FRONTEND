import base from './base.js'

const endpoint = '/libro';

const findAll = async () => await base.get(endpoint);

const findOne = async (id) => await base.get(`${endpoint}/${id}`);

const create = async (payload) => await base.post(endpoint, payload)

const update = async (payload) => await base.put(endpoint,payload);

const api = { findAll , findOne , create , update }

export default api;