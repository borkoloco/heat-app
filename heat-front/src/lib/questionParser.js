export function parseQuestions(content) {
  // Split based on the question identifier (e.g., **Question1:**, **Question2:**, etc.)
  const questionBlocks = content.split(/\*\*Question\d+:\*\*/).slice(1); // Remove the first empty element

  return questionBlocks.map((block, index) => {
    // Adjusted regex to match any content before **OPTIONS:**
    const questionMatch = block.match(/(.*?)\*\*OPTIONS:\*\*/s);
    const questionText = questionMatch ? questionMatch[1].trim() : null;

    // Extract the options between **OPTIONS:** and **Answer\d+:**
    const optionsMatch = block.match(
      /\*\*OPTIONS:\*\*(.*?)\*\*Answer\d+:\*\*/s
    );
    const optionsText = optionsMatch ? optionsMatch[1].trim() : null;

    // Extract the answer after **Answer\d+:** and capture only the letter in parentheses
    const answerMatch = block.match(/\*\*Answer\d+:\*\*\((.)\)/);
    const correctAnswer = answerMatch ? answerMatch[1].trim() : null; // Extract just the letter

    // Split the options into an array, cleaning up any extra spaces and empty lines
    const options = optionsText
      ? optionsText
          .split("\n")
          .map((option) => option.trim())
          .filter((option) => option)
      : [];

    // Debugging logs
    console.log({
      questionText,
      options,
      correctAnswer,
    });

    return {
      question: questionText,
      options: options,
      correctAnswer: correctAnswer, // Now contains only the letter
    };
  });
}

// export function parseQuestions(content) {
//   // Split based on the question identifier (e.g., **Question1:**, **Question2:**, etc.)
//   const questionBlocks = content.split(/\*\*Question\d+:\*\*/).slice(1); // Remove the first empty element

//   return questionBlocks.map((block, index) => {
//     // Adjusted regex to match any content before **OPTIONS:**
//     const questionMatch = block.match(/(.*?)\*\*OPTIONS:\*\*/s);
//     const questionText = questionMatch ? questionMatch[1].trim() : null;

//     // Extract the options between **OPTIONS:** and **Answer\d+:**
//     const optionsMatch = block.match(
//       /\*\*OPTIONS:\*\*(.*?)\*\*Answer\d+:\*\*/s
//     );
//     const optionsText = optionsMatch ? optionsMatch[1].trim() : null;

//     // Extract the answer after **Answer\d+:**
//     const answerMatch = block.match(/\*\*Answer\d+:\*\*(.*)/s);
//     const correctAnswer = answerMatch ? answerMatch[1].trim() : null;

//     // Split the options into an array, cleaning up any extra spaces and empty lines
//     const options = optionsText
//       ? optionsText
//           .split("\n")
//           .map((option) => option.trim())
//           .filter((option) => option)
//       : [];

//     // Debugging logs
//     console.log({
//       questionText,
//       options,
//       correctAnswer,
//     });

//     return {
//       question: questionText,
//       options: options,
//       correctAnswer: correctAnswer,
//     };
//   });
// }

// export function parseQuestions(content) {
//   const questionBlocks = content.split(/\*\*Question\d+:\*\*/).slice(1);

//   return questionBlocks.map((block, index) => {
//     const questionMatch = block.match(/(.*?)\*\*OPTIONS:\*\*/);
//     const questionText = questionMatch ? questionMatch[1].trim() : null;

//     const optionsMatch = block.match(
//       /\*\*OPTIONS:\*\*(.*?)\*\*Answer\d+:\*\*/s
//     );
//     const optionsText = optionsMatch ? optionsMatch[1].trim() : null;

//     const answerMatch = block.match(/\*\*Answer\d+:\*\*(.*)/);
//     const correctAnswer = answerMatch ? answerMatch[1].trim() : null;

//     const options = optionsText
//       ? optionsText
//           .split("\n")
//           .map((option) => option.trim())
//           .filter((option) => option)
//       : [];

//     // Debugging logs
//     console.log({
//       questionText,
//       options,
//       correctAnswer,
//     });

//     return {
//       question: questionText,
//       options: options,
//       correctAnswer: correctAnswer,
//     };
//   });
// }

// export function parseQuestions(content) {
//   // Split based on the question identifier (e.g., **Question1:**, **Question2:**, etc.)
//   console.log(content);
//   const questionBlocks = content.split(/\*\*Question\d+:\*\*/).slice(1); // Remove the first empty element

//   return questionBlocks.map((block, index) => {
//     // Extract the question text before **OPTIONS:**
//     const questionMatch = block.match(/(.*?)\*\*OPTIONS:\*\*/);
//     const questionText = questionMatch ? questionMatch[1].trim() : null;

//     // Extract the options between **OPTIONS:** and **Answer1:**
//     const optionsMatch = block.match(/\*\*OPTIONS:\*\*(.*?)\*\*Answer\d+:\*\*/);
//     const optionsText = optionsMatch ? optionsMatch[1].trim() : null;

//     // Extract the answer after **Answer1:**
//     const answerMatch = block.match(/\*\*Answer\d+:\*\*(.*)/);
//     const correctAnswer = answerMatch ? answerMatch[1].trim() : null;

//     // Split the options into an array and remove extra spaces
//     const options = optionsText
//       ? optionsText.split("\n").map((option) => option.trim())
//       : [];

//     return {
//       question: questionText,
//       options: options,
//       correctAnswer: correctAnswer,
//     };
//   });
// }

// export function parseQuestions(content) {
//   const questionBlocks = content.split(/\*\*Question\d+:\*\*/).slice(1);

//   return questionBlocks.map((block, index) => {
//     const questionMatch = block.match(/(.*?)\*\*OPTIONS:\*\*/);
//     const questionText = questionMatch ? questionMatch[1].trim() : null;

//     const optionsMatch = block.match(/\*\*OPTIONS:\*\*(.*?)\*\*Answer\d+:\*\*/);
//     const optionsText = optionsMatch ? optionsMatch[1].trim() : null;

//     const answerMatch = block.match(/\*\*Answer\d+:\*\*(.*)/);
//     const correctAnswer = answerMatch ? answerMatch[1].trim() : null;

//     const options = optionsText
//       ? optionsText.split("\n").map((option) => option.trim())
//       : [];

//     return {
//       question: questionText,
//       options: options,
//       correctAnswer: correctAnswer,
//     };
//   });
// }

// export function parseQuestions(content) {
//   // Dividimos el contenido por cada pregunta
//   const questionBlocks = content.split(/\*\*Question\s*\d+:\*\*/);

//   return questionBlocks.slice(1).map((block) => {
//     // Dividimos la parte de la pregunta y la parte de la respuesta correcta
//     const [questionPart, correctAnswerPart] = block.split(
//       "**Correct answer:**"
//     );

//     // Obtenemos todas las líneas de la pregunta y las limpiamos
//     const questionLines = questionPart
//       .trim()
//       .split("\n")
//       .filter((line) => line.trim() !== "");

//     // La primera línea es la pregunta
//     const questionText = questionLines[0].trim();

//     // Revisa si hay texto adicional después de la pregunta y antes de las opciones
//     let additionalText = "";
//     let optionsStartIndex = 1;

//     if (!questionLines[1].startsWith("(A)")) {
//       additionalText = questionLines[1].trim();
//       optionsStartIndex = 2;
//     }

//     // Capturamos las opciones, asegurando que se incluyan todas
//     const options = questionLines.slice(optionsStartIndex).map((option) => {
//       return option.trim();
//     });

//     // Extraemos la respuesta correcta entre paréntesis
//     const correctAnswer = correctAnswerPart.match(/\((.*?)\)/)[1].trim();

//     return {
//       question: questionText,
//       additionalText: additionalText || null, // Si no hay texto adicional, dejamos null
//       options: options,
//       correctAnswer: correctAnswer,
//     };
//   });
// }

// export function parseQuestions(content) {
//   // Dividimos el contenido por cada pregunta identificando el formato de Question seguido por un número
//   const questionBlocks = content.split(/\*\*Question\s*\d+:\*\*/);

//   return questionBlocks.slice(1).map((block) => {
//     // Dividimos la pregunta y la parte de la respuesta correcta
//     const [questionPart, correctAnswerPart] = block.split(
//       "**Correct answer:**"
//     );

//     // Extraemos todas las líneas de la pregunta
//     const questionLines = questionPart
//       .trim()
//       .split("\n")
//       .filter((line) => line.trim() !== "");

//     // La primera línea es la pregunta
//     const questionText = questionLines[0].trim();

//     // Si hay texto adicional después de la pregunta, lo capturamos
//     const additionalText =
//       questionLines[1] && !questionLines[1].startsWith("(A)")
//         ? questionLines[1].trim()
//         : "";

//     // Las opciones son las líneas que empiezan con (A), (B), (C), (D)
//     const optionsStartIndex = additionalText ? 2 : 1;
//     const options = questionLines
//       .slice(optionsStartIndex)
//       .map((option) => option.trim());

//     // Obtenemos la respuesta correcta entre paréntesis
//     const correctAnswer = correctAnswerPart.match(/\((.*?)\)/)[1];

//     return {
//       question: questionText,
//       additionalText: additionalText || null, // Incluimos el texto adicional si existe
//       options: options,
//       correctAnswer: correctAnswer,
//     };
//   });
// }

// export function parseQuestions(content) {
//   // Split the content by "Question" to separate each block
//   const questionBlocks = content.split(/\*\*Question\s*\d+:\*\*/);

//   return questionBlocks.slice(1).map((block) => {
//     // Split the block into question and correct answer parts
//     const [questionPart, correctAnswerPart] = block.split(
//       "**Correct answer:**"
//     );

//     // Extract the question text and any additional phrases or lines before options
//     const questionLines = questionPart
//       .trim()
//       .split("\n")
//       .filter((line) => line.trim() !== "");

//     // Find the first line that is not part of the options, which will be the question text
//     const questionText = questionLines[0].trim();
//     const additionalText = questionLines[1] ? questionLines[1].trim() : ""; // If there's extra text

//     // Extract options by looking for lines that start with the options (A), (B), etc.
//     const optionsStartIndex = additionalText ? 2 : 1; // If there's additional text, options start after it
//     const options = questionLines
//       .slice(optionsStartIndex) // Options should start after the question and additional text (if present)
//       .map((option) => option.trim());

//     // Extract the correct answer from the "Correct answer" part
//     const correctAnswer = correctAnswerPart.match(/\((.*?)\)/)[1];

//     return {
//       question: questionText,
//       additionalText: additionalText || null, // Include any additional text if present
//       options: options,
//       correctAnswer: correctAnswer,
//     };
//   });
// }

// export function parseQuestions(content) {
//   // Split the content by "Question" to separate each block
//   const questionBlocks = content.split(/\*\*Question\s*\d+:\*\*/);

//   return questionBlocks.slice(1).map((block) => {
//     // Split the block into question and correct answer parts
//     const [questionPart, correctAnswerPart] = block.split(
//       "**Correct answer:**"
//     );

//     // Extract the question text by finding the first non-empty line after the question number
//     const questionLines = questionPart
//       .trim()
//       .split("\n")
//       .filter((line) => line.trim() !== "");

//     // The actual question text should be the second element in the array
//     const questionText = questionLines[0].trim();

//     // Extract options by looking for lines that start with the options (A), (B), etc.
//     const options = questionLines
//       .slice(1) // Options should start after the question
//       .map((option) => option.trim()); // Clean up each option

//     // Extract the correct answer from the "Correct answer" part
//     const correctAnswer = correctAnswerPart.match(/\((.*?)\)/)[1];

//     return {
//       question: questionText,
//       options: options,
//       correctAnswer: correctAnswer,
//     };
//   });
// }

// export function parseQuestions(content) {
//   const questionBlocks = content.split("**Question");

//   return questionBlocks.slice(1).map((block, index) => {
//     const [questionPart, correctAnswerPart] = block.split("**Correct answer:");

//     const questionLines = questionPart.trim().split("\n\n");
//     const questionText = questionLines[1];

//     const options = questionLines[2].split("\n").map((option) => option.trim());

//     const correctAnswer = correctAnswerPart.match(/\((.*?)\)/)[1];

//     return {
//       question: questionText,
//       options: options,
//       correctAnswer: correctAnswer,
//     };
//   });
// }
