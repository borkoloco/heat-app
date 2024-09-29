const axios = require("axios");
const { GoogleAuth } = require("google-auth-library");
const fs = require("fs");
const sdk = require("microsoft-cognitiveservices-speech-sdk");

const generateQuestions = async () => {
  const questions = {
    content:
      " **Question 1:**\n\nWhich of the following sentences is grammatically correct?\n\n(A) The boy kicked the ball.\n(B) The ball kicked the boy.\n(C) The ball was kicked by the boy.\n(D) The boy was kicked by the ball.\n\n**Correct answer:** (C) The ball was kicked by the boy.\n\n**Question 2:**\n\nWhich of the following sentences is grammatically correct?\n\n(A) I am going to the store.\n(B) I am going to store.\n(C) I go to the store.\n(D) I go to store.\n\n**Correct answer:** (A) I am going to the store.\n\n**Question 3:**\n\nWhich of the following sentences is grammatically correct?\n\n(A) The man gave the woman a book.\n(B) The man gave a book the woman.\n(C) The man gave the woman book.\n(D) The man gave a book woman.\n\n**Correct answer:** (A) The man gave the woman a book.",
  };
  return questions;
};
//----------------------------------------------------------------------------------------
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

//----------------------------------------------------------------------------------------------

const calculateAverageAccuracyScore = (evaluationResult) => {
  let wordTotalScore = 0;
  let wordCount = 0;

  let phonemeTotalScore = 0;
  let phonemeCount = 0;

  let syllableTotalScore = 0;
  let syllableCount = 0;

  if (evaluationResult.NBest && evaluationResult.NBest.length > 0) {
    evaluationResult.NBest[0].Words?.forEach((wordData) => {
      if (wordData.PronunciationAssessment) {
        wordTotalScore += wordData.PronunciationAssessment.AccuracyScore;
        wordCount++;
      }

      if (wordData.Syllables) {
        wordData.Syllables.forEach((syllableData) => {
          if (syllableData.PronunciationAssessment) {
            syllableTotalScore +=
              syllableData.PronunciationAssessment.AccuracyScore;
            syllableCount++;
          }
        });
      }

      if (wordData.Phonemes) {
        wordData.Phonemes.forEach((phonemeData) => {
          if (phonemeData.PronunciationAssessment) {
            phonemeTotalScore +=
              phonemeData.PronunciationAssessment.AccuracyScore;
            phonemeCount++;
          }
        });
      }
    });
  } else {
    console.error("El resultado de NBest no está disponible o está vacío.");
    return 0;
  }

  const wordAverage = wordCount > 0 ? wordTotalScore / wordCount : 0;
  const phonemeAverage =
    phonemeCount > 0 ? phonemeTotalScore / phonemeCount : 0;
  const syllableAverage =
    syllableCount > 0 ? syllableTotalScore / syllableCount : 0;

  const finalAverage = (wordAverage + phonemeAverage + syllableAverage) / 3;
  console.log(finalAverage);
  return finalAverage;
};

const evaluateAudio = async (audioFilePath) => {
  const audioData = fs.readFileSync(audioFilePath);
  const subscriptionKey = process.env.AZURE_SPEECH_KEY;
  const region = process.env.AZURE_REGION;

  const speechConfig = sdk.SpeechConfig.fromSubscription(
    subscriptionKey,
    region
  );

  const pronunciationAssessmentConfig = new sdk.PronunciationAssessmentConfig(
    "The quick brown fox jumps over the lazy dog.",
    sdk.PronunciationAssessmentGradingSystem.HundredMark,
    sdk.PronunciationAssessmentGranularity.Phoneme,
    true
  );

  const audioConfig = sdk.AudioConfig.fromWavFileInput(audioData);
  const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

  pronunciationAssessmentConfig.applyTo(recognizer);

  return new Promise((resolve, reject) => {
    recognizer.recognizeOnceAsync((result) => {
      if (result.reason === sdk.ResultReason.RecognizedSpeech) {
        const evaluationResult = JSON.parse(
          result.properties.getProperty(
            sdk.PropertyId.SpeechServiceResponse_JsonResult
          )
        );

        resolve(evaluationResult);
        console.log(evaluationResult);
      } else {
        reject("No se pudo reconocer el audio.");
      }
    });
  }).then((evaluationResult) => {
    const audioScore = calculateAverageAccuracyScore(evaluationResult);
    return audioScore;
  });
};

const evaluateTest = (userAnswers, correctAnswers) => {
  const correctCount = correctAnswers.reduce(
    (acc, correct, index) => acc + (userAnswers[index] === correct ? 1 : 0),
    0
  );
  const score = (correctCount / correctAnswers.length) * 100;
  return score;
};

module.exports = {
  generateQuestions,
  evaluateAudio,
  evaluateTest,
};
