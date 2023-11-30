import base from './base.js'

const endpoint = '/rol';

const findAll = async () => await base.get(endpoint);

const api = { findAll }

export default api;