export function parseQuestions(content) {
  const questionBlocks = content.split("**Question");

  return questionBlocks
    .filter((block) => block.trim())
    .map((block) => {
      const questionMatch = block.match(/(\d+)\*\*(.*?)\*\*OPTIONS\*\*/s);
      const questionText = questionMatch ? questionMatch[2].trim() : null;

      const optionsMatch = block.match(
        /\*\*OPTIONS\*\*(.*?)\*\*Answer\d+\{([A-D])\}/s
      );
      const optionsText = optionsMatch ? optionsMatch[1].trim() : null;
      const correctAnswer = optionsMatch ? optionsMatch[2].trim() : null;

      const options = optionsText
        ? optionsText
            .split("**")
            .map((opt) => opt.replace(/\([A-D]\)\{(.*?)\}/, "$1").trim())
            .filter(Boolean)
        : [];

      return {
        question: questionText,
        options,
        correctAnswer,
      };
    });
}
