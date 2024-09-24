"use client";
import { useState, useEffect } from "react";

import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

export default function Home() {
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    console.log("Home component mounted");
  }, []);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {showLogin ? <LoginForm /> : <RegisterForm />}
        <div className="text-center mt-4">
          {showLogin ? (
            <p>
              Don't have an account?{" "}
              <button
                onClick={() => setShowLogin(false)}
                className="text-blue-500 hover:underline"
              >
                Register here
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setShowLogin(true)}
                className="text-blue-500 hover:underline"
              >
                Log In here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// "use client";
// import { useState } from "react";
// import LoginForm from "./components/LoginForm";
// import RegisterForm from "./components/RegisterForm";

// export default function Home() {
//   const [showLogin, setShowLogin] = useState(true);

//   return (
//     <div className="h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         {showLogin ? <LoginForm /> : <RegisterForm />}
//         <div className="text-center mt-4">
//           {showLogin ? (
//             <p>
//               Don't have an account?{" "}
//               <button
//                 onClick={() => setShowLogin(false)}
//                 className="text-blue-500 hover:underline"
//               >
//                 Register here
//               </button>
//             </p>
//           ) : (
//             <p>
//               Already have an account?{" "}
//               <button
//                 onClick={() => setShowLogin(true)}
//                 className="text-blue-500 hover:underline"
//               >
//                 Log In here
//               </button>
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();

//   const startTest = () => {
//     router.push("/questions");
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-blue-100">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold mb-6">
//           Welcome to Howdy Englist Assessment Task
//         </h1>
//         <p className="mb-4 text-lg">
//           This test will evaluate your English level through grammar questions
//           and an audio assessment.
//         </p>
//         <button
//           onClick={startTest}
//           className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
//         >
//           Start the Test
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const router = useRouter();

//   const startTest = () => {
//     router.push("/questions");
//   };

//   return (
//     <div className="h-screen flex items-center justify-center bg-blue-100">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold mb-6">
//           Bienvenido al Test de Inglés
//         </h1>
//         <button
//           onClick={startTest}
//           className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
//         >
//           Comenzar el Test
//         </button>
//       </div>
//     </div>
//   );
// }
