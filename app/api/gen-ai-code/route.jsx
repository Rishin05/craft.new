import { GenAiCode } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        // Send message to AI model
        const result = await GenAiCode.sendMessage(prompt);
        const resp = await result.response.text(); // Get raw response


        // Remove markdown-style backticks if present
        const sanitizedResp = resp.replace(/^```json/, "").replace(/```$/, "").trim();

        // Parse response
        let parsedResp;
        try {
            parsedResp = JSON.parse(sanitizedResp);
        } catch (jsonError) {
            console.error("JSON Parsing Error:", jsonError, "\nRaw Response:", sanitizedResp);
            return NextResponse.json(
                { error: "Invalid JSON response", rawData: sanitizedResp },
                { status: 500 }
            );
        }

        return NextResponse.json(parsedResp);
    } catch (e) {
        console.error("Server Error:", e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}
