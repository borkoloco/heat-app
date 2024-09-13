const responseService = require("../services/response.service");

const createResponse = async (req, res) => {
  try {
    const response = await responseService.createResponse(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la respuesta" });
  }
};

const getResponses = async (req, res) => {
  try {
    const responses = await responseService.getResponses();
    res.json(responses);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las respuestas" });
  }
};

module.exports = {
  createResponse,
  getResponses,
};
