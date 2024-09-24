const express = require("express");
const router = express.Router();
const vertexaiController = require("../controllers/vertexai.controller");

// obtener las preguntas
router.get("/questions", vertexaiController.getQuestions);

//  respuestas del test
router.post("/submit-answers", vertexaiController.submitTest);

// audio
router.post("/upload-audio", vertexaiController.submitAudio);

//evaluación final
router.post("/final-evaluation", vertexaiController.evaluateFinal);

module.exports = router;
