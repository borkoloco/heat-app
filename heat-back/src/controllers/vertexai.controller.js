const vertexaiService = require("../services/vertexai.service");

const getQuestions = async (req, res) => {
  try {
    const questions = await vertexaiService.generateQuestions();
    res.status(200).json({ questions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const submitTest = async (req, res) => {
  const { answers } = req.body;
  const correctAnswers = ["A", "C", "B"]; // Simulación de respuestas correctas

  try {
    const score = vertexaiService.evaluateTest(answers, correctAnswers);
    res.status(200).json({ score });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const submitAudio = async (req, res) => {
  const audioFilePath = req.file.path; // Ruta del archivo de audio
  try {
    const evaluation = await vertexaiService.evaluateAudio(audioFilePath);
    res.status(200).json({ evaluation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const evaluateFinal = async (req, res) => {
  const { answers } = req.body;
  const correctAnswers = ["A", "C", "B"]; // Simulación de respuestas correctas
  const score = vertexaiService.evaluateTest(answers, correctAnswers);

  // Evaluar el audio
  const audioEvaluation = await vertexaiService.evaluateAudio(req.file.path);
  const finalEvaluation = `Your score on the grammar questions is: ${score}/3. Audio evaluation: ${audioEvaluation}.`;

  res.status(200).json({ evaluation: finalEvaluation });
};

module.exports = {
  getQuestions,
  submitTest,
  submitAudio,
  evaluateFinal,
};

// const vertexaiService = require("../services/vertexai.service");

// const getQuestions = async (req, res) => {
//   try {
//     const questions = await vertexaiService.generateQuestions();
//     res.status(200).json({ questions });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const submitTest = async (req, res) => {
//   const { answers } = req.body; // Respuestas del usuario
//   const correctAnswers = ["A", "C", "B"]; // Simulación de respuestas correctas (esto vendría de la IA o previamente definido)

//   try {
//     const score = vertexaiService.evaluateTest(answers, correctAnswers);
//     res.status(200).json({ score });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const submitAudio = async (req, res) => {
//   vertexaiService.uploadAudio(req, res, async function (err) {
//     if (err) {
//       return res.status(500).json({ error: err.message });
//     }

//     try {
//       const audioFilePath = req.file.path; // Ruta del archivo de audio
//       const evaluation = await vertexaiService.evaluateAudio(audioFilePath);
//       res.status(200).json({ evaluation });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
// };

// const evaluateFinal = async (req, res) => {
//   const { answers } = req.body;
//   const correctAnswers = ["A", "C", "B"]; // Simulación
//   const score = vertexaiService.evaluateTest(answers, correctAnswers);

//   // Ahora evaluamos el audio
//   const audioEvaluation = await vertexaiService.evaluateAudio(req.file.path);
//   const finalEvaluation = `Tu puntuación en las preguntas es: ${score}/3. Evaluación de tu audio: ${audioEvaluation}.`;

//   res.status(200).json({ evaluation: finalEvaluation });
// };

// module.exports = {
//   getQuestions,
//   submitTest,
//   submitAudio,
//   evaluateFinal,
// };

// const vertexAiService = require("../services/vertexai.service");

// // Controlador para manejar las predicciones sin datos de entrada
// const predictText = async (req, res) => {
//   try {
//     // Llamamos al servicio de Vertex AI sin necesidad de inputText
//     const prediction = await vertexAiService.predict();

//     // Devolver la respuesta generada por el modelo
//     res.status(200).json({ question: prediction[0] });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//   predictText,
// };

// const vertexAiService = require("../services/vertexai.service");

// // Controlador para manejar la predicción sin datos de entrada
// const predictText = async (req, res) => {
//   try {
//     // Llamamos al servicio de Vertex AI para generar la pregunta
//     const prediction = await vertexAiService.predict();

//     // La respuesta debe contener la pregunta de gramática generada
//     res.status(200).json({ question: prediction[0] }); // Asumiendo que la predicción devuelve una lista
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = {
//   predictText,
// };
