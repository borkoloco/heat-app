// src/app/api/questionnaire/submit/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();

  // Aquí haces la petición a tu backend de Express
  const res = await fetch("http://localhost:4000/api/openai/submit", {
    // URL de tu backend
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  return NextResponse.json(data); // Respuesta que devolverás al frontend
}
