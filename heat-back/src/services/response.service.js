const Response = require("../models/response.model");

const createResponse = async (data) => {
  return await Response.create(data);
};

const getResponses = async () => {
  return await Response.findAll();
};

const getResponseById = async (id) => {
  return await Response.findByPk(id);
};

module.exports = {
  createResponse,
  getResponses,
  getResponseById,
};
