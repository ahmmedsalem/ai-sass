import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import OpenAI from "openai";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

const instructionMessage = {
  role: "system",
  content:
    "You are a coding assistant. You should only respond to programming-related questions. Provide code for programming requests and include concise explanations of the code. If the question is not related to code or programming, respond with: 'I can only assist with programming-related questions.'",
};

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!openai.apiKey) {
      return new NextResponse("Open Ai Key not configured", { status: 500 });
    }
    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free trial has expire.", { status: 403 });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });
    if (!isPro) {
      await increaseApiLimit();
    }
    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.log("code error", error);
    return new NextResponse("code error", { status: 500 });
  }
}
