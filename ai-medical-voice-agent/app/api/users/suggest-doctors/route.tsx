import { openai } from "@/config/OpenAiModel";
import { NextRequest, NextResponse } from "next/server";
import { AIDoctorAgents } from "@/public/shared/list";

export async function POST(req: NextRequest) {
  try {
    const { notes } = await req.json();

    if (!notes) {
      return NextResponse.json(
        { error: "Notes/Symptoms required" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "google/gemini-2.5-pro",
      messages: [
        {
          role: "system",
          content: JSON.stringify(AIDoctorAgents),
        },
        {
          role: "user",
          content: `User Notes/Symptoms: ${notes}. Based on the symptoms, suggest a list of doctors. Return JSON only.`,
        },
      ],
      max_tokens: 500,
      temperature: 0.3,
    });

    const message = completion.choices?.[0]?.message;

    return NextResponse.json({ result: message });
  } catch (e) {
    console.error("Error in suggest-doctors route:", e);
    return NextResponse.json(
      { error: String(e) },
      { status: 500 }
    );
  }
}
