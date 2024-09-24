"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { uploadAudio, submitFinalEvaluation } from "@/lib/api";

export default function UploadAudioPage() {
  const [audioFile, setAudioFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const answers = JSON.parse(searchParams.get("answers")); // Respuestas previas

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Subir audio
    const audioEvaluation = await uploadAudio(audioFile);

    // Enviar respuestas y evaluación del audio
    const finalResult = await submitFinalEvaluation(answers, audioEvaluation);

    router.push({
      pathname: "/result",
      query: { evaluation: finalResult.evaluation },
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
        <h2 className="text-xl mb-4">Sube tu audio para completar el test</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            className="mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? "Subiendo..." : "Enviar y obtener resultado"}
          </button>
        </form>
      </div>
    </div>
  );
}

// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/router";
// import { uploadAudio, submitFinalEvaluation } from "@/lib/api";

// export default function UploadAudioPage() {
//   const [audioFile, setAudioFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const answers = JSON.parse(searchParams.get("answers"));

//   const handleFileChange = (e) => {
//     setAudioFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Subir audio
//     const audioEvaluation = await uploadAudio(audioFile);

//     // Enviar respuestas y evaluación del audio
//     const finalResult = await submitFinalEvaluation(answers, audioEvaluation);

//     router.push({
//       pathname: "/result",
//       query: { evaluation: finalResult.evaluation },
//     });
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
//         <h2 className="text-xl mb-4">Sube tu audio para completar el test</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="file"
//             accept="audio/*"
//             onChange={handleFileChange}
//             className="mb-4"
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
//             disabled={loading}
//           >
//             {loading ? "Subiendo..." : "Enviar y obtener resultado"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { uploadAudio, submitFinalEvaluation } from "@/lib/api";

// export default function UploadAudio() {
//   const [audioFile, setAudioFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const answers = JSON.parse(searchParams.get("answers")); // Respuestas previas

//   const handleFileChange = (e) => {
//     setAudioFile(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     // Subir audio
//     const audioEvaluation = await uploadAudio(audioFile);

//     // Enviar respuestas y evaluación del audio
//     const finalResult = await submitFinalEvaluation(answers, audioEvaluation);

//     router.push({
//       pathname: "/result",
//       query: { evaluation: finalResult.evaluation },
//     });
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
//         <h2 className="text-xl mb-4">Sube tu audio para completar el test</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="file"
//             accept="audio/*"
//             onChange={handleFileChange}
//             className="mb-4"
//           />
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
//             disabled={loading}
//           >
//             {loading ? "Subiendo..." : "Enviar y obtener resultado"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
