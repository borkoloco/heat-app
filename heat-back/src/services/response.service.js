const Response = require("../models/response.model");

const createResponse = async (data) => {
  return await Response.create(data);
};

const getResponsesByUser = async (userId) => {
  return await Response.findAll({
    include: {
      model: Candidate,
      where: { userId },
    },
  });
};

module.exports = {
  createResponse,
  getResponsesByUser,
};
