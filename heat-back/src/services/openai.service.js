// Cargar las variables de entorno desde el archivo .env
require("dotenv").config();

const OpenAI = require("openai");

// Configuración de OpenAI usando la clave de API desde las variables de entorno
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Asegúrate de que tu API key esté configurada en tu archivo .env
});

/**
 * Función para generar preguntas de inglés con OpenAI
 * @returns {Array} - Un arreglo de preguntas generadas
 */
// async function generateQuestions() {
//   const prompt = `
//     Genera 3 preguntas para medir el nivel de inglés:
//     1. Pregunta de texto simple
//     2. Otra pregunta de texto
//     3. Otra pregunta de texto
//     4. Solicita al usuario cargar un archivo de audio para medir la pronunciación.
//   `;

//   const response = await openai.chat.completions.create({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "system", content: prompt }],
//   });

//   // El contenido de las preguntas generado por OpenAI
//   const questionsText = response.choices[0].message.content;

//   // Procesar las preguntas y devolverlas en formato JSON
//   const questions = [
//     { id: 1, question: questionsText.split("\n")[1], type: "text" },
//     { id: 2, question: questionsText.split("\n")[2], type: "text" },
//     { id: 3, question: questionsText.split("\n")[3], type: "text" },
//     {
//       id: 4,
//       question: "Cargue un archivo de audio para medir su pronunciación",
//       type: "audio",
//     },
//   ];

//   return questions; // Devolver las preguntas en formato JSON
// }
async function generateQuestions() {
  const prompt = `Genera 3 preguntas para medir el nivel de inglés...`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: prompt }],
    });
    const questionsText = response.choices[0].message.content;

    return [
      { id: 1, question: questionsText.split("\n")[1], type: "text" },
      { id: 2, question: questionsText.split("\n")[2], type: "text" },
      { id: 3, question: questionsText.split("\n")[3], type: "text" },
      { id: 4, question: "Cargue un archivo de audio...", type: "audio" },
    ];
  } catch (error) {
    if (error.code === "insufficient_quota") {
      console.error("Excediste tu cuota. Verifica tu plan de OpenAI.");
    } else {
      console.error("Error al generar preguntas:", error);
    }
    throw error;
  }
}

/**
 * Función para corregir respuestas de texto y evaluar audio con OpenAI
 * @param {Array} textResponses - Las respuestas de texto proporcionadas por el estudiante
 * @param {String} audioResponse - La transcripción del audio proporcionada por el estudiante
 * @returns {Object} - Resultado de la evaluación de las respuestas de texto y audio
 */
async function correctQuestions(textResponses, audioResponse) {
  const textPrompt = `
    Eres un profesor de inglés. Corrige la gramática y proporciona un feedback detallado de las siguientes respuestas de texto:
    ${textResponses
      .map((response, index) => `Pregunta ${index + 1}: ${response}`)
      .join("\n")}
  `;

  const responseTextAnalysis = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Corrige la gramática y da feedback detallado.",
      },
      { role: "user", content: textPrompt },
    ],
  });

  const audioPrompt = `
    Eres un profesor de inglés. Evalúa la calidad de la pronunciación y la fluidez del siguiente texto, que es una transcripción de un audio:
    "${audioResponse}"
  `;

  const responseAudioAnalysis = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Evalúa el nivel de inglés del siguiente texto transcrito.",
      },
      { role: "user", content: audioPrompt },
    ],
  });

  return {
    textAnalysis: responseTextAnalysis.choices[0].message.content,
    audioAnalysis: responseAudioAnalysis.choices[0].message.content,
  };
}

module.exports = { correctQuestions, generateQuestions };

// // Cargar las variables de entorno desde el archivo .env
// require("dotenv").config();

// const { Configuration, OpenAIApi } = require("openai");

// // Configuración de OpenAI usando la clave de API desde las variables de entorno
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// /**
//  * Función para generar preguntas de inglés con OpenAI
//  * @returns {Array} - Un arreglo de preguntas generadas
//  */
// async function generateQuestions() {
//   const prompt = `
//     Genera 3 preguntas para medir el nivel de inglés:
//     1. Pregunta de texto simple
//     2. Otra pregunta de texto
//     3. Otra pregunta de texto
//     4. Solicita al usuario cargar un archivo de audio para medir la pronunciación.
//   `;

//   const response = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "system", content: prompt }],
//   });

//   // El contenido de las preguntas generado por OpenAI
//   const questionsText = response.data.choices[0].message.content;

//   // Procesar las preguntas y devolverlas en formato JSON
//   const questions = [
//     { id: 1, question: questionsText.split("\n")[1], type: "text" },
//     { id: 2, question: questionsText.split("\n")[2], type: "text" },
//     { id: 3, question: questionsText.split("\n")[3], type: "text" },
//     {
//       id: 4,
//       question: "Cargue un archivo de audio para medir su pronunciación",
//       type: "audio",
//     },
//   ];

//   return questions; // Devolver las preguntas en formato JSON
// }

// /**
//  * Función para corregir respuestas de texto y evaluar audio con OpenAI
//  * @param {Array} textResponses - Las respuestas de texto proporcionadas por el estudiante
//  * @param {String} audioResponse - La transcripción del audio proporcionada por el estudiante
//  * @returns {Object} - Resultado de la evaluación de las respuestas de texto y audio
//  */
// async function correctQuestions(textResponses, audioResponse) {
//   const textPrompt = `
//     Eres un profesor de inglés. Corrige la gramática y proporciona un feedback detallado de las siguientes respuestas de texto:
//     ${textResponses
//       .map((response, index) => `Pregunta ${index + 1}: ${response}`)
//       .join("\n")}
//   `;

//   const responseTextAnalysis = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "system",
//         content: "Corrige la gramática y da feedback detallado.",
//       },
//       { role: "user", content: textPrompt },
//     ],
//   });

//   const audioPrompt = `
//     Eres un profesor de inglés. Evalúa la calidad de la pronunciación y la fluidez del siguiente texto, que es una transcripción de un audio:
//     "${audioResponse}"
//   `;

//   const responseAudioAnalysis = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "system",
//         content: "Evalúa el nivel de inglés del siguiente texto transcrito.",
//       },
//       { role: "user", content: audioPrompt },
//     ],
//   });

//   return {
//     textAnalysis: responseTextAnalysis.data.choices[0].message.content,
//     audioAnalysis: responseAudioAnalysis.data.choices[0].message.content,
//   };
// }

// module.exports = { correctQuestions, generateQuestions };

// // Cargar las variables de entorno desde el archivo .env
// require("dotenv").config();

// const { OpenAIApi } = require("openai");

// // Configuración de OpenAI usando la clave de API desde las variables de entorno
// const openai = new OpenAIApi({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// /**
//  * Función para generar preguntas de inglés con OpenAI
//  * @returns {Array} - Un arreglo de preguntas generadas
//  */
// async function generateQuestions() {
//   const prompt = `
//     Genera 3 preguntas para medir el nivel de inglés:
//     1. Pregunta de texto simple
//     2. Otra pregunta de texto
//     3. Otra pregunta de texto
//     4. Solicita al usuario cargar un archivo de audio para medir la pronunciación.
//   `;

//   const response = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "system", content: prompt }],
//   });

//   // El contenido de las preguntas generado por OpenAI
//   const questionsText = response.data.choices[0].message.content;

//   // Procesar las preguntas y devolverlas en formato JSON
//   const questions = [
//     { id: 1, question: questionsText.split("\n")[1], type: "text" },
//     { id: 2, question: questionsText.split("\n")[2], type: "text" },
//     { id: 3, question: questionsText.split("\n")[3], type: "text" },
//     {
//       id: 4,
//       question: "Cargue un archivo de audio para medir su pronunciación",
//       type: "audio",
//     },
//   ];

//   return questions; // Devolver las preguntas en formato JSON
// }

// /**
//  * Función para corregir respuestas de texto y evaluar audio con OpenAI
//  * @param {Array} textResponses - Las respuestas de texto proporcionadas por el estudiante
//  * @param {String} audioResponse - La transcripción del audio proporcionada por el estudiante
//  * @returns {Object} - Resultado de la evaluación de las respuestas de texto y audio
//  */
// async function correctQuestions(textResponses, audioResponse) {
//   const textPrompt = `
//     Eres un profesor de inglés. Corrige la gramática y proporciona un feedback detallado de las siguientes respuestas de texto:
//     ${textResponses
//       .map((response, index) => `Pregunta ${index + 1}: ${response}`)
//       .join("\n")}
//   `;

//   const responseTextAnalysis = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "system",
//         content: "Corrige la gramática y da feedback detallado.",
//       },
//       { role: "user", content: textPrompt },
//     ],
//   });

//   const audioPrompt = `
//     Eres un profesor de inglés. Evalúa la calidad de la pronunciación y la fluidez del siguiente texto, que es una transcripción de un audio:
//     "${audioResponse}"
//   `;

//   const responseAudioAnalysis = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "system",
//         content: "Evalúa el nivel de inglés del siguiente texto transcrito.",
//       },
//       { role: "user", content: audioPrompt },
//     ],
//   });

//   return {
//     textAnalysis: responseTextAnalysis.data.choices[0].message.content,
//     audioAnalysis: responseAudioAnalysis.data.choices[0].message.content,
//   };
// }

// module.exports = { correctQuestions, generateQuestions };

// // Cargar las variables de entorno desde el archivo .env
// require("dotenv").config();

// const { Configuration, OpenAIApi } = require("openai");

// // Configuración de OpenAI usando la clave de API desde las variables de entorno
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY, // Asegúrate de que tu API key esté configurada en tu archivo .env
// });

// const openai = new OpenAIApi(configuration);

// /**
//  * Función para generar preguntas de inglés con OpenAI
//  * @returns {Array} - Un arreglo de preguntas generadas
//  */
// async function generateQuestions() {
//   const prompt = `
//     Genera 3 preguntas para medir el nivel de inglés:
//     1. Pregunta de texto simple
//     2. Otra pregunta de texto
//     3. Otra pregunta de texto
//     4. Solicita al usuario cargar un archivo de audio para medir la pronunciación.
//   `;

//   const response = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "system", content: prompt }],
//   });

//   // El contenido de las preguntas generado por OpenAI
//   const questionsText = response.data.choices[0].message.content;

//   // Procesar las preguntas y devolverlas en formato JSON
//   const questions = [
//     { id: 1, question: questionsText.split("\n")[1], type: "text" },
//     { id: 2, question: questionsText.split("\n")[2], type: "text" },
//     { id: 3, question: questionsText.split("\n")[3], type: "text" },
//     {
//       id: 4,
//       question: "Cargue un archivo de audio para medir su pronunciación",
//       type: "audio",
//     },
//   ];

//   return questions; // Devolver las preguntas en formato JSON
// }

// /**
//  * Función para corregir respuestas de texto y evaluar audio con OpenAI
//  * @param {Array} textResponses - Las respuestas de texto proporcionadas por el estudiante
//  * @param {String} audioResponse - La transcripción del audio proporcionada por el estudiante
//  * @returns {Object} - Resultado de la evaluación de las respuestas de texto y audio
//  */
// async function correctQuestions(textResponses, audioResponse) {
//   const textPrompt = `
//     Eres un profesor de inglés. Corrige la gramática y proporciona un feedback detallado de las siguientes respuestas de texto:
//     ${textResponses
//       .map((response, index) => `Pregunta ${index + 1}: ${response}`)
//       .join("\n")}
//   `;

//   const responseTextAnalysis = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "system",
//         content: "Corrige la gramática y da feedback detallado.",
//       },
//       { role: "user", content: textPrompt },
//     ],
//   });

//   const audioPrompt = `
//     Eres un profesor de inglés. Evalúa la calidad de la pronunciación y la fluidez del siguiente texto, que es una transcripción de un audio:
//     "${audioResponse}"
//   `;

//   const responseAudioAnalysis = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "system",
//         content: "Evalúa el nivel de inglés del siguiente texto transcrito.",
//       },
//       { role: "user", content: audioPrompt },
//     ],
//   });

//   return {
//     textAnalysis: responseTextAnalysis.data.choices[0].message.content,
//     audioAnalysis: responseAudioAnalysis.data.choices[0].message.content,
//   };
// }

// module.exports = { correctQuestions, generateQuestions };

// const { OpenAI } = require("openai");
// // const { OpenAIApi } = require("openai");
// const { Configuration } = require("openai/dist/configuration");

// // const OpenAI = require("openai");

// const configuration = new OpenAI.Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const openai = new OpenAI.OpenAIApi(configuration);

// // Configuración de OpenAI usando la clave de API desde las variables de entorno
// // const configuration = new Configuration({
// //   apiKey: process.env.OPENAI_API_KEY, // Asegúrate de que tu API key esté configurada en tu archivo .env
// // });
// // const openai = new OpenAIApi(configuration);

// /**
//  * Función para generar preguntas de inglés con OpenAI
//  * @returns {Array} - Un arreglo de preguntas generadas
//  */
// async function generateQuestions() {
//   const prompt = `
//     Genera 3 preguntas para medir el nivel de inglés:
//     1. Pregunta de texto simple
//     2. Otra pregunta de texto
//     3. Otra pregunta de texto
//     4. Solicita al usuario cargar un archivo de audio para medir la pronunciación.
//   `;

//   const response = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "system", content: prompt }],
//   });

//   // El contenido de las preguntas generado por OpenAI
//   const questionsText = response.data.choices[0].message.content;

//   // Procesar las preguntas y devolverlas en formato JSON
//   const questions = [
//     { id: 1, question: questionsText.split("\n")[1], type: "text" },
//     { id: 2, question: questionsText.split("\n")[2], type: "text" },
//     { id: 3, question: questionsText.split("\n")[3], type: "text" },
//     {
//       id: 4,
//       question: "Cargue un archivo de audio para medir su pronunciación",
//       type: "audio",
//     },
//   ];

//   return questions; // Devolver las preguntas en formato JSON
// }

// /**
//  * Función para corregir respuestas de texto y evaluar audio con OpenAI
//  * @param {Array} textResponses - Las respuestas de texto proporcionadas por el estudiante
//  * @param {String} audioResponse - La transcripción del audio proporcionada por el estudiante
//  * @returns {Object} - Resultado de la evaluación de las respuestas de texto y audio
//  */
// async function correctQuestions(textResponses, audioResponse) {
//   const textPrompt = `
//     Eres un profesor de inglés. Corrige la gramática y proporciona un feedback detallado de las siguientes respuestas de texto:
//     ${textResponses
//       .map((response, index) => `Pregunta ${index + 1}: ${response}`)
//       .join("\n")}
//   `;

//   const responseTextAnalysis = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "system",
//         content: "Corrige la gramática y da feedback detallado.",
//       },
//       { role: "user", content: textPrompt },
//     ],
//   });

//   const audioPrompt = `
//     Eres un profesor de inglés. Evalúa la calidad de la pronunciación y la fluidez del siguiente texto, que es una transcripción de un audio:
//     "${audioResponse}"
//   `;

//   const responseAudioAnalysis = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: "system",
//         content: "Evalúa el nivel de inglés del siguiente texto transcrito.",
//       },
//       { role: "user", content: audioPrompt },
//     ],
//   });

//   return {
//     textAnalysis: responseTextAnalysis.data.choices[0].message.content,
//     audioAnalysis: responseAudioAnalysis.data.choices[0].message.content,
//   };
// }

// module.exports = { correctQuestions, generateQuestions };

// // services/openai.service.js
// const openai = require("openai");

// async function correctQuestions(textResponses, audioResponse) {
//   const gptModel = "gpt-3.5-turbo";

//   const responseTextAnalysis = await openai.createChatCompletion({
//     model: gptModel,
//     messages: [
//       {
//         role: "system",
//         content: "Corrige la gramática y da feedback de estas respuestas.",
//       },
//       {
//         role: "user",
//         content: `Estas son las respuestas: ${JSON.stringify(textResponses)}`,
//       },
//     ],
//   });

//   const responseAudioAnalysis = await openai.createChatCompletion({
//     model: gptModel,
//     messages: [
//       {
//         role: "system",
//         content: "Evalúa el nivel de inglés de este audio transcrito.",
//       },
//       { role: "user", content: `Texto transcrito: ${audioResponse}` },
//     ],
//   });

//   return {
//     textAnalysis: responseTextAnalysis.data.choices[0].message.content,
//     audioAnalysis: responseAudioAnalysis.data.choices[0].message.content,
//   };
// }

// module.exports = { correctQuestions };

// const { OpenAIApi, Configuration } = require("openai");

// // Configuración de OpenAI usando la clave de API desde las variables de entorno
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY, // Asegúrate de tener esta clave en tu archivo .env
// });

// const openai = new OpenAIApi(configuration);

// /**
//  * Función para generar preguntas de inglés con OpenAI
//  * @returns {Array} - Un arreglo de preguntas generadas
//  */
// async function generateQuestions() {
//   const prompt = `
//     Genera 3 preguntas para medir el nivel de inglés:
//     1. Pregunta de texto simple
//     2. Otra pregunta de texto
//     3. Otra pregunta de texto
//     4. Solicita al usuario cargar un archivo de audio para medir la pronunciación.
//   `;

//   const response = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "system", content: prompt }],
//   });

//   const questionsText = response.data.choices[0].message.content;

//   const questions = [
//     { id: 1, question: questionsText.split('\n')[1], type: "text" },
//     { id: 2, question: questionsText.split('\n')[2], type: "text" },
//     { id: 3, question: questionsText.split('\n')[3], type: "text" },
//     { id: 4, question: "Cargue un archivo de audio para medir su pronunciación", type: "audio" },
//   ];

//   return questions;
// }

// module.exports = { generateQuestions };
