"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const evaluation = searchParams.get("evaluation");

  return (
    <div className="h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Resultados del Test</h1>
        <p className="text-lg">{evaluation}</p>
        <button
          onClick={() => router.push("/")}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
}
