"use client";
import { useRouter } from "next/navigation";

export default function StartTest() {
  const router = useRouter();

  const startTest = () => {
    router.push("/questions");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-blue-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to Howdy Englist Assessment Task
        </h1>
        <p className="mb-4 text-lg">
          This test will evaluate your English level through grammar questions
          and an audio assessment.
        </p>
        <button
          onClick={startTest}
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
        >
          Start the Test
        </button>
      </div>
    </div>
  );
}
