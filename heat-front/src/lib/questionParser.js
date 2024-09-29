export function parseQuestions(content) {
  const questionBlocks = content.split("**Question");

  return questionBlocks.slice(1).map((block, index) => {
    const [questionPart, correctAnswerPart] = block.split("**Correct answer:");

    const questionLines = questionPart.trim().split("\n\n");
    const questionText = questionLines[1];

    const options = questionLines[2].split("\n").map((option) => option.trim());

    const correctAnswer = correctAnswerPart.match(/\((.*?)\)/)[1];

    return {
      question: questionText,
      options: options,
      correctAnswer: correctAnswer,
    };
  });
}
