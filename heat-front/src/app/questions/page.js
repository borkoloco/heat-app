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
