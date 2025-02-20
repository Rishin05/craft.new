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

        // More robust JSON extraction
        let cleanedResponse = resp;
        
        // Remove any markdown code block indicators and trim
        if (resp.includes('```')) {
            // Extract content between first ``` and last ```
            const matches = resp.match(/```(?:json)?([\s\S]*?)```/);
            if (matches && matches[1]) {
                cleanedResponse = matches[1].trim();
            }
        }

        // Handle case where response might start with a newline or whitespace
        cleanedResponse = cleanedResponse.trim();

        // Parse response
        let parsedResp;
        try {
            parsedResp = JSON.parse(cleanedResponse);
        } catch (jsonError) {
            console.error("JSON Parsing Error:", jsonError);
            console.log("Cleaned Response:", cleanedResponse);
            
            // Attempt to fix common JSON issues
            try {
                // Replace any invalid line endings
                cleanedResponse = cleanedResponse.replace(/\n/g, '\\n').replace(/\r/g, '\\r');
                // Ensure proper JSON string escaping
                cleanedResponse = cleanedResponse.replace(/(?<!\\)"/g, '\\"');
                parsedResp = JSON.parse(cleanedResponse);
            } catch (secondaryError) {
                return NextResponse.json(
                    { 
                        error: "Invalid JSON response", 
                        details: jsonError.message,
                        rawResponse: cleanedResponse.substring(0, 1000) // First 1000 chars for debugging
                    }, 
                    { status: 500 }
                );
            }
        }

        if (!parsedResp) {
            return NextResponse.json({ error: "Empty response from AI model" }, { status: 500 });
        }

        return NextResponse.json(parsedResp);
    } catch (e) {
        console.error("Server Error:", e);
        
        // Check for API key errors
        if (e.message?.includes('API key expired')) {
            return NextResponse.json(
                { error: "API key has expired. Please update your API key." }, 
                { status: 401 }
            );
        }
        
        return NextResponse.json(
            { error: "Internal server error", details: e.message }, 
            { status: 500 }
        );
    }
}