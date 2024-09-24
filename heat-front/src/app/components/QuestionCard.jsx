export default function QuestionCard({ question, onAnswerSelected }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
      <h2 className="text-xl mb-4">{question.question}</h2>
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelected(option)}
            className="block w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

// export default function QuestionCard({ question, onAnswerSelected }) {
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
//       <h2 className="text-xl mb-4">{question.question}</h2>
//       <div className="space-y-4">
//         {question.options.map((option, index) => (
//           <button
//             key={index}
//             onClick={() => onAnswerSelected(option)}
//             className="block w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//           >
//             {option}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function QuestionCard({ question, onAnswerSelected }) {
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
//       <h2 className="text-xl mb-4">{question.question}</h2>
//       <div className="space-y-4">
//         {question.options.map((option, index) => (
//           <button
//             key={index}
//             onClick={() => onAnswerSelected(option)}
//             className="block w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//           >
//             {option}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default function QuestionCard({ question, onAnswerSelected }) {
//   return (
//     <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
//       <h2 className="text-xl mb-4">{question.question}</h2>
//       <div className="space-y-4">
//         {question.options.map((option, index) => (
//           <button
//             key={index}
//             onClick={() => onAnswerSelected(option)}
//             className="block w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//           >
//             {option}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// }
