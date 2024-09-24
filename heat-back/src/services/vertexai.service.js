const axios = require("axios");
const { GoogleAuth } = require("google-auth-library");
const fs = require("fs");

const generateQuestions = async () => {
  return {
    questions: {
      content:
        ' **1. ¿Cuál es el pasado simple del verbo "to be"?**\n\na) was\nb) were\nc) been\nd) is\n\n**Respuesta:** a) was\n\n**2. ¿Cuál es el presente perfecto del verbo "to go"?**\n\na) have gone\nb) has gone\nc) went\nd) going\n\n**Respuesta:** a) have gone\n\n**3. ¿Cuál es el futuro simple del verbo "to do"?**\n\na) will do\nb) do\nc) did\nd) doing\n\n**Respuesta:** a) will do',
      citationMetadata: {
        citations: [],
      },
      safetyAttributes: {
        scores: [0.1, 0.2, 0.1, 0.1, 0.1],
        blocked: false,
        safetyRatings: [
          {
            category: "Dangerous Content",
            severityScore: 0.1,
            probabilityScore: 0.1,
            severity: "NEGLIGIBLE",
          },
          {
            category: "Harassment",
            probabilityScore: 0.2,
            severityScore: 0.1,
            severity: "NEGLIGIBLE",
          },
          {
            probabilityScore: 0.1,
            severityScore: 0.1,
            severity: "NEGLIGIBLE",
            category: "Hate Speech",
          },
          {
            probabilityScore: 0.1,
            category: "Sexually Explicit",
            severityScore: 0.1,
            severity: "NEGLIGIBLE",
          },
        ],
        categories: ["Derogatory", "Insult", "Profanity", "Sexual", "Toxic"],
      },
    },
  };
};
//   const projectId = process.env.GOOGLE_PROJECT_ID;
//   const location = "us-central1";
//   const model = "text-bison";

//   // Configurar la autenticación
//   const auth = new GoogleAuth({
//     keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
//     scopes: ["https://www.googleapis.com/auth/cloud-platform"],
//   });

//   const accessToken = await auth.getAccessToken();
//   const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${model}:predict`;

//   // Prompt para generar 3 preguntas
//   const prompt =
//     "Generate 3 English grammar questions with multiple choice options, include 4 options for each question, and specify the correct answer.";

//   const requestBody = {
//     instances: [{ prompt }],
//     parameters: {
//       temperature: 0.2,
//       maxOutputTokens: 512,
//       topK: 40,
//       topP: 0.95,
//     },
//   };

//   try {
//     const response = await axios.post(url, requestBody, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     });
//     return response.data.predictions[0]; // Devolver las preguntas generadas
//   } catch (error) {
//     console.error("Error generating questions with Vertex AI:", error.message);
//     throw new Error("Question generation failed.");
//   }
// };

const evaluateAudio = async (audioFilePath) => {
  // Simulación de transcripción de audio para evaluación
  const transcript = "Simulated audio transcription"; // Replace this with actual transcription from the AI
  const evaluation = `English level evaluation based on the transcription: ${transcript}`;

  // Clean up the audio file after processing
  fs.unlinkSync(audioFilePath);

  return evaluation;
};

const evaluateTest = (userAnswers, correctAnswers) => {
  let score = 0;
  correctAnswers.forEach((correct, index) => {
    if (userAnswers[index] === correct) {
      score++;
    }
  });
  return score;
};

module.exports = {
  generateQuestions,
  evaluateAudio,
  evaluateTest,
};

// const axios = require("axios");
// const { GoogleAuth } = require("google-auth-library");
// const multer = require("multer");
// const fs = require("fs");
// const path = require("path");

// const generateQuestions = async () => {
//   return {
//     questions: {
//       content:
//         ' **1. ¿Cuál es el pasado simple del verbo "to be"?**\n\na) was\nb) were\nc) been\nd) is\n\n**Respuesta:** a) was\n\n**2. ¿Cuál es el presente perfecto del verbo "to go"?**\n\na) have gone\nb) has gone\nc) went\nd) going\n\n**Respuesta:** a) have gone\n\n**3. ¿Cuál es el futuro simple del verbo "to do"?**\n\na) will do\nb) do\nc) did\nd) doing\n\n**Respuesta:** a) will do',
//       citationMetadata: {
//         citations: [],
//       },
//       safetyAttributes: {
//         scores: [0.1, 0.2, 0.1, 0.1, 0.1],
//         blocked: false,
//         safetyRatings: [
//           {
//             category: "Dangerous Content",
//             severityScore: 0.1,
//             probabilityScore: 0.1,
//             severity: "NEGLIGIBLE",
//           },
//           {
//             category: "Harassment",
//             probabilityScore: 0.2,
//             severityScore: 0.1,
//             severity: "NEGLIGIBLE",
//           },
//           {
//             probabilityScore: 0.1,
//             severityScore: 0.1,
//             severity: "NEGLIGIBLE",
//             category: "Hate Speech",
//           },
//           {
//             probabilityScore: 0.1,
//             category: "Sexually Explicit",
//             severityScore: 0.1,
//             severity: "NEGLIGIBLE",
//           },
//         ],
//         categories: ["Derogatory", "Insult", "Profanity", "Sexual", "Toxic"],
//       },
//     },
//   };
//   // const projectId = process.env.GOOGLE_PROJECT_ID;
//   // const location = "us-central1";
//   // const model = "text-bison";

//   // // Configurar la autenticación
//   // const auth = new GoogleAuth({
//   //   keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
//   //   scopes: ["https://www.googleapis.com/auth/cloud-platform"],
//   // });

//   // const accessToken = await auth.getAccessToken();
//   // const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${model}:predict`;

//   // // Prompt para generar 3 preguntas
//   // const prompt =
//   //   "Genera 3 preguntas de gramática en inglés con opción múltiple, incluye 4 opciones para cada pregunta, y señala la respuesta correcta.";

//   // const requestBody = {
//   //   instances: [{ prompt }],
//   //   parameters: {
//   //     temperature: 0.2,
//   //     maxOutputTokens: 512,
//   //     topK: 40,
//   //     topP: 0.95,
//   //   },
//   // };

//   // try {
//   //   const response = await axios.post(url, requestBody, {
//   //     headers: {
//   //       Authorization: `Bearer ${accessToken}`,
//   //       "Content-Type": "application/json",
//   //     },
//   //   });
//   //   return response.data.predictions[0]; // Devolver las preguntas generadas
//   // } catch (error) {
//   //   console.error("Error durante la generación de preguntas:", error.message);
//   //   throw new Error("La generación de preguntas falló.");
//   // }
// };

// const uploadAudio = multer({
//   dest: "uploads/", // Carpeta donde se guardará temporalmente el audio
//   limits: { fileSize: 10 * 1024 * 1024 }, // Limitar el tamaño del archivo a 10MB
// }).single("audio");

// const evaluateAudio = async (audioFilePath) => {
//   // Lógica para enviar el audio a la IA y obtener la evaluación.
//   // Aquí podrías utilizar un modelo preentrenado de Google Cloud Speech-to-Text para transcribir el audio y evaluar el nivel de inglés.
//   // Luego usar un modelo de lenguaje para evaluar la calidad de la transcripción.

//   const transcript = "Simulación de transcripción de audio"; // Cambia esto por la llamada real a la IA
//   const evaluation = `Evaluación del nivel de inglés basada en la transcripción: ${transcript}`;

//   // Limpiar el archivo de audio después de procesarlo
//   fs.unlinkSync(audioFilePath);

//   return evaluation;
// };

// const evaluateTest = (userAnswers, correctAnswers) => {
//   let score = 0;
//   correctAnswers.forEach((correct, index) => {
//     if (userAnswers[index] === correct) {
//       score++;
//     }
//   });
//   return score;
// };

// module.exports = {
//   generateQuestions,
//   uploadAudio,
//   evaluateAudio,
//   evaluateTest,
// };

// const axios = require("axios");
// const { GoogleAuth } = require("google-auth-library");

// const predict = async () => {
//   const projectId = process.env.GOOGLE_PROJECT_ID;
//   const location = "us-central1"; // Asegúrate de que esta sea la región correcta
//   const model = "text-bison"; // El modelo predefinido de Google

//   // Autenticación usando el archivo de credenciales JSON
//   const auth = new GoogleAuth({
//     keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS, // Ruta a tu archivo de credenciales JSON
//     scopes: ["https://www.googleapis.com/auth/cloud-platform"],
//   });

//   const accessToken = await auth.getAccessToken();

//   const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${model}:predict`;

//   // Prompt fijo para que siempre genere una pregunta de gramática
//   const prompt = "Genera una pregunta de gramática con opciones múltiples.";

//   const requestBody = {
//     instances: [{ prompt }],
//     parameters: {
//       temperature: 0.2, // Controla la aleatoriedad
//       maxOutputTokens: 256, // Máximo número de tokens generados en la respuesta
//       topK: 40, // Considera los 40 tokens más probables
//       topP: 0.95, // Controla la diversidad de los tokens generados
//     },
//   };

//   try {
//     const response = await axios.post(url, requestBody, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     });

//     return response.data.predictions;
//   } catch (error) {
//     console.error(
//       "Error durante la predicción:",
//       error.response ? error.response.data : error.message
//     );
//     throw new Error("La predicción falló.");
//   }
// };

// module.exports = {
//   predict,
// };

// const { PredictionServiceClient } = require("@google-cloud/aiplatform").v1;
// const client = new PredictionServiceClient();

// // Función para realizar una predicción en Vertex AI sin recibir datos del cliente
// const predict = async () => {
//   const projectId = process.env.GOOGLE_PROJECT_ID;
//   const location = "us-central1"; // Ajusta según tu región
//   const endpointId = process.env.GOOGLE_VERTEX_AI_ENDPOINT_ID || "text-bison"; // Modelo predefinido

//   // Define un prompt fijo para generar una pregunta de gramática
//   const prompt = `Genera una pregunta de gramática con opciones múltiples. Proporciona 4 opciones y señala la correcta.`;

//   const instances = [
//     {
//       content: prompt,
//     },
//   ];

//   const request = {
//     endpoint: `projects/${projectId}/locations/${location}/publishers/google/models/${endpointId}`,
//     instances,
//   };

//   try {
//     const [response] = await client.predict(request);
//     return response.predictions;
//   } catch (err) {
//     console.error("Error durante la predicción:", err);
//     throw new Error("La predicción falló.");
//   }
// };

// module.exports = {
//   predict,
// };
