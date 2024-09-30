export function parseQuestions(content) {
  // Split the content by "Question" to separate each block
  const questionBlocks = content.split(/\*\*Question\s*\d+:\*\*/);

  return questionBlocks.slice(1).map((block) => {
    // Split the block into question and correct answer parts
    const [questionPart, correctAnswerPart] = block.split(
      "**Correct answer:**"
    );

    // Extract the question text by finding the first non-empty line after the question number
    const questionLines = questionPart
      .trim()
      .split("\n")
      .filter((line) => line.trim() !== "");

    // The actual question text should be the second element in the array
    const questionText = questionLines[0].trim();

    // Extract options by looking for lines that start with the options (A), (B), etc.
    const options = questionLines
      .slice(1) // Options should start after the question
      .map((option) => option.trim()); // Clean up each option

    // Extract the correct answer from the "Correct answer" part
    const correctAnswer = correctAnswerPart.match(/\((.*?)\)/)[1];

    return {
      question: questionText,
      options: options,
      correctAnswer: correctAnswer,
    };
  });
}

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
