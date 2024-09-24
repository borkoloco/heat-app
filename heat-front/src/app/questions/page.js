"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import QuestionCard from "../components/QuestionCard";
import { fetchQuestions } from "@/lib/api";

export default function QuestionsPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await fetchQuestions();
        setQuestions(data);
      } catch (error) {
        console.error("Error al obtener las preguntas:", error);
      }
    };

    getQuestions();
  }, []);

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      router.push({
        pathname: "/upload-audio",
        query: { answers: JSON.stringify([...answers, answer]) },
      });
    }
  };

  if (questions.length === 0) {
    return <div>Cargando preguntas...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <QuestionCard
        question={currentQuestion}
        onAnswerSelected={handleAnswer}
      />
    </div>
  );
}



// questions: {
//   content:
//     ' **1. ¿Cuál es el pasado simple del verbo "to be"?**\n\na) was\nb) were\nc) been\nd) is\n\n**Respuesta:** a) was\n\n**2. ¿Cuál es el presente perfecto del verbo "to go"?**\n\na) have gone\nb) has gone\nc) went\nd) going\n\n**Respuesta:** a) have gone\n\n**3. ¿Cuál es el futuro simple del verbo "to do"?**\n\na) will do\nb) do\nc) did\nd) doing\n\n**Respuesta:** a) will do',
//   citationMetadata: {
//     citations: [],
//   },
//   safetyAttributes: {
//     scores: [0.1, 0.2, 0.1, 0.1, 0.1],
//     blocked: false,
//     safetyRatings: [
//       {
//         category: "Dangerous Content",
//         severityScore: 0.1,
//         probabilityScore: 0.1,
//         severity: "NEGLIGIBLE",
//       },
//       {
//         category: "Harassment",
//         probabilityScore: 0.2,
//         severityScore: 0.1,
//         severity: "NEGLIGIBLE",
//       },
//       {
//         probabilityScore: 0.1,
//         severityScore: 0.1,
//         severity: "NEGLIGIBLE",
//         category: "Hate Speech",
//       },
//       {
//         probabilityScore: 0.1,
//         category: "Sexually Explicit",
//         severityScore: 0.1,
//         severity: "NEGLIGIBLE",
//       },
//     ],
//     categories: ["Derogatory", "Insult", "Profanity", "Sexual", "Toxic"],
//   },


// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";
// import QuestionCard from "../components/QuestionCard";
// import { fetchQuestions } from "../../lib/api";

// export default function QuestionsPage() {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     const getQuestions = async () => {
//       try {
//         const data = await fetchQuestions();
//         setQuestions(data.questions);
//       } catch (error) {
//         console.error("Error al obtener las preguntas:", error);
//       }
//     };

//     getQuestions();
//   }, []);

//   const handleAnswer = (answer) => {
//     setAnswers([...answers, answer]);

//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       router.push({
//         pathname: "/upload-audio",
//         query: { answers: JSON.stringify([...answers, answer]) },
//       });
//     }
//   };

//   if (questions.length === 0) {
//     return <div>Cargando preguntas...</div>;
//   }

//   const currentQuestion = questions[currentQuestionIndex];

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-100">
//       <QuestionCard
//         question={currentQuestion}
//         onAnswerSelected={handleAnswer}
//       />
//     </div>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import QuestionCard from "../components/QuestionCard";
// import { fetchQuestions } from "../../lib/api";

// export default function Questions() {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     const getQuestions = async () => {
//       try {
//         const data = await fetchQuestions();
//         setQuestions(data.questions);
//       } catch (error) {
//         console.error("Error al obtener las preguntas:", error);
//       }
//     };

//     getQuestions();
//   }, []);

//   const handleAnswer = (answer) => {
//     setAnswers([...answers, answer]);

//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       router.push({
//         pathname: "/upload-audio",
//         query: { answers: JSON.stringify([...answers, answer]) },
//       });
//     }
//   };

//   if (questions.length === 0) {
//     return <div>Cargando preguntas...</div>;
//   }

//   const currentQuestion = questions[currentQuestionIndex];

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-100">
//       <QuestionCard
//         question={currentQuestion}
//         onAnswerSelected={handleAnswer}
//       />
//     </div>
//   );
// }

// "use client";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import QuestionCard from "../components/QuestionCard";
// import { fetchQuestions } from "../../lib/api";

// export default function Questions() {
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [answers, setAnswers] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     const getQuestions = async () => {
//       const data = await fetchQuestions();
//       setQuestions(data.questions);
//     };

//     getQuestions();
//   }, []);

//   const handleAnswer = (answer) => {
//     setAnswers([...answers, answer]);

//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else {
//       router.push({
//         pathname: "/upload-audio",
//         query: { answers: JSON.stringify([...answers, answer]) },
//       });
//     }
//   };

//   if (questions.length === 0) {
//     return <div>Cargando preguntas...</div>;
//   }

//   const currentQuestion = questions[currentQuestionIndex];

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-100">
//       <QuestionCard
//         question={currentQuestion}
//         onAnswerSelected={handleAnswer}
//       />
//     </div>
//   );
// }
