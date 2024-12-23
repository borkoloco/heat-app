const axios = require("axios");
const { GoogleAuth } = require("google-auth-library");
const fs = require("fs");
const sdk = require("microsoft-cognitiveservices-speech-sdk");

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  throw new Error("El cuestionario no esta disponible, intenta mas tarde.");
}

const generateQuestions = async () => {
  const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
  const apiKey = process.env.AZURE_OPENAI_KEY;
  const modelName = process.env.AZURE_OPENAI_MODEL || "gpt-35-turbo";

  if (!endpoint || !apiKey) {
    throw new Error(
      "Configuración de Azure OpenAI no encontrada. Verifica las variables de entorno."
    );
  }

  // const prompt = `
  // Generate 3 English grammar multiple-choice questions in the following format:

  // **Question1**{Question text here}**OPTIONS**(A){Option A}**(B){Option B}**(C){Option C}**(D){Option D}**Answer1{Correct Option (A, B, C, or D)}

  // Make sure to include exactly 4 options and use the correct structure without any extra spaces.
  // `;
  const prompt = `
Generate a set of three multiple-choice grammar questions. Format the output as follows:

**Question1** [Your question here] **OPTIONS**(A){Option A}**(B){Option B}**(C){Option C}**(D){Option D}**Answer1{Correct Option Letter}

**Question2** [Your question here] **OPTIONS**(A){Option A}**(B){Option B}**(C){Option C}**(D){Option D}**Answer2{Correct Option Letter}

**Question3** [Your question here] **OPTIONS**(A){Option A}**(B){Option B}**(C){Option C}**(D){Option D}**Answer3{Correct Option Letter}

Ensure the options are relevant to the question, and include exactly one correct answer.

  `;

  const requestBody = {
    messages: [
      {
        role: "system",
        content:
          "You are an assistant specialized in creating educational grammar questions.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_tokens: 512,
    temperature: 0.7,
    top_p: 0.9,
  };

  try {
    const response = await axios.post(
      `${endpoint}/openai/deployments/${modelName}/chat/completions?api-version=2024-08-01-preview`,

      requestBody,
      {
        headers: {
          "Content-Type": "application/json",
          "api-key": apiKey,
        },
      }
    );

    const result = response.data.choices[0].message.content.trim();

    console.log("Preguntas generadas:\n", result);
    return result;
  } catch (error) {
    console.error(
      "Error al generar preguntas con Azure OpenAI:",
      error.message
    );
    throw new Error(
      "No se pudo generar el cuestionario. Intenta nuevamente más tarde."
    );
  }
};

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
