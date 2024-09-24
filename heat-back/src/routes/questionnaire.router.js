const express = require("express");
const openaiService = require("../services/openai.service"); // Tu servicio para la API de OpenAI
const responseService = require("../services/response.service"); // Para manejar las respuestas en la DB
const router = express.Router();

// Ruta para generar preguntas de inglés
router.get("/generate", async (req, res) => {
  try {
    const questions = await openaiService.generateQuestions(); // Generar preguntas usando OpenAI
    res.status(200).json(questions); // Enviar las preguntas al frontend
  } catch (error) {
    res.status(500).json({ error: "Error al generar las preguntas" });
    console.log(error);
  }
});

module.exports = router;

router.post("/submit", async (req, res) => {
  try {
    const { textResponses, audioResponse } = req.body;

    // Enviar las respuestas a OpenAI para evaluación
    const correctionResult = await openaiService.correctQuestions(
      textResponses,
      audioResponse
    );

    // Guardar la respuesta en la base de datos (esto dependerá de tu lógica)
    const response = await responseService.createResponse({
      ...req.body,
      responseAi: correctionResult,
      status: "completed",
    });

    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ error: "Error al procesar el cuestionario" });
  }
});

module.exports = router;

// // routes/questionnaire.router.js
// const express = require("express");
// const questionnaireController = require("../controllers/questionnaire.controller");
// const router = express.Router();

// router.post("/submit", questionnaireController.submitTest);

// module.exports = router;

// const express = require('express');
// const openaiService = require('../services/openai.service'); // Importa el servicio que acabas de crear

// const router = express.Router();

// // Ruta para generar preguntas de inglés usando OpenAI
// router.get('/generate', async (req, res) => {
//   try {
//     const questions = await openaiService.generateQuestions();
//     res.status(200).json(questions); // Devolver las preguntas generadas
//   } catch (error) {
//     console.error('Error al generar preguntas:', error);
//     res.status(500).json({ error: 'Error al generar preguntas' });
//   }
// });

// // Ruta para corregir respuestas de inglés usando OpenAI
// router.post('/correct', async (req, res) => {
//   try {
//     const { textResponses, audioResponse } = req.body; // Recibir las respuestas del frontend
//     const corrections = await openaiService.correctQuestions(textResponses, audioResponse);
//     res.status(200).json(corrections); // Devolver el resultado de la corrección
//   } catch (error) {
//     console.error('Error al corregir respuestas:', error);
//     res.status(500).json({ error: 'Error al corregir respuestas' });
//   }
// });

// module.exports = router;
