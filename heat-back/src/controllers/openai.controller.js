// controllers/questionnaire.controller.js
const openaiService = require("../services/openai.service");
const responseService = require("../services/response.service");

const submitTest = async (req, res) => {
  try {
    const { textResponses, audioResponse } = req.body;

    const correctionResult = await openaiService.correctQuestions(
      textResponses,
      audioResponse
    );

    const response = await responseService.createResponse({
      ...req.body,
      responseAi: correctionResult,
      status: "completed",
    });

    res.status(200).json({ response, correctionResult });
  } catch (error) {
    res.status(500).json({ error: "Error al procesar el test" });
  }
};

module.exports = { submitTest };
