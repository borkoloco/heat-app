export const fetchQuestions = async () => {
  const res = await fetch("/api/vertexai/questions");
  if (!res.ok) throw new Error("Error al obtener las preguntas");
  const data = await res.json();
  return data.questions;
};

export const uploadAudio = async (file) => {
  const formData = new FormData();
  formData.append("audio", file);

  const res = await fetch("/upload-audio", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Error al subir el audio");
  return await res.json();
};

export const submitFinalEvaluation = async (answers, audioEvaluation) => {
  const res = await fetch("/api/vertexai/final-evaluation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers, audioEvaluation }),
  });

  if (!res.ok) throw new Error("Error al enviar la evaluación final");
  return await res.json();
};

// export const fetchQuestions = async () => {
//   const res = await fetch("/api/vertexai/questions");
//   if (!res.ok) throw new Error("Error al obtener las preguntas");
//   const data = await res.json();
//   return data;
// };

// export const uploadAudio = async (audioFile) => {
//   const formData = new FormData();
//   formData.append("audio", audioFile);

//   const res = await fetch("/api/vertexai/upload-audio", {
//     method: "POST",
//     body: formData,
//   });
//   if (!res.ok) throw new Error("Error al subir el audio");

//   const data = await res.json();
//   return data.evaluation;
// };

// export const submitFinalEvaluation = async (answers, audioEvaluation) => {
//   const res = await fetch("/api/vertexai/final-evaluation", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ answers, audioEvaluation }),
//   });
//   if (!res.ok) throw new Error("Error al enviar la evaluación final");

//   const data = await res.json();
//   return data;
// };

// export const fetchQuestions = async () => {
//   const res = await fetch("http://localhost:4000/api/vertexai/questions");
//   if (!res.ok) throw new Error("Error al obtener las preguntas");
//   const data = await res.json();

//   // Extraer las preguntas del campo "content"
//   const rawContent = data.questions.content;

//   // Dividir las preguntas en base a las líneas de texto y procesarlas
//   const questions = rawContent
//     .split("**")
//     .filter((q) => q.includes("?"))
//     .map((q) => {
//       const lines = q.split("\n").filter((line) => line.trim() !== "");
//       const questionText = lines[0].trim();
//       const options = lines
//         .slice(1, 5)
//         .map((option) => option.split(") ")[1].trim()); // Procesar opciones
//       return {
//         question: questionText,
//         options,
//       };
//     });

//   return { questions };
// };

// export const fetchQuestions = async () => {
//   const res = await fetch("/api/english-test/questions");
//   if (!res.ok) throw new Error("Error al obtener las preguntas");
//   return res.json();
// };

// export const uploadAudio = async (audioFile) => {
//   const formData = new FormData();
//   formData.append("audio", audioFile);

//   const res = await fetch("/api/english-test/upload-audio", {
//     method: "POST",
//     body: formData,
//   });

//   if (!res.ok) throw new Error("Error al subir el audio");
//   return res.json();
// };

// export const submitFinalEvaluation = async (answers, audioEvaluation) => {
//   const res = await fetch("/api/english-test/final-evaluation", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ answers, audioEvaluation }),
//   });

//   if (!res.ok) throw new Error("Error al enviar la evaluación final");
//   return res.json();
// };
