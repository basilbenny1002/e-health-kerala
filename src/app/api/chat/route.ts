import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
      config: {
        systemInstruction: "You are a helpful CarePulse telemedicine AI assistant. Your primary job is to support patients by:\n1. Symptom Analysis & Department Suggestion: Analyze symptoms and explicitly recommend the specific medical department (e.g., Cardiology, Pediatrics, etc.).\n2. Prescription Analysis: Explain medication purpose, usage, and side effects.\n\nGuideline: Keep responses extremely short, concise, and precise. Provide a structured, helpful preliminary analysis first, then suggest the correct department. Put a concise medical disclaimer at the bottom. Use clean markdown.\n\nCRITICAL LANGUAGE INSTRUCTION: You MUST respond in the exact same language the user uses. If the user types in Malayalam, your entire response (including the medical disclaimer) MUST be in fluent Malayalam. If the user types in English, respond in English.",
      }
    });

    return NextResponse.json({ reply: response.text });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Failed to generate response' }, { status: 500 });
  }
}
