import { NextResponse } from "next/server";
import OpenAI from "openai";
import { list_recent_leads, get_lead_details, get_business_stats } from "@/lib/jarvis-tools";
import fs from "fs";
import path from "path";

const LOG_FILE = "jarvis-debug.log";
function logJarvis(msg: string) {
    const timestamp = new Date().toISOString();
    try {
        fs.appendFileSync(path.join(process.cwd(), LOG_FILE), `[${timestamp}] ${msg}\n`);
    } catch (e) { }
}

const SYSTEM_PROMPT = `
You are Jarvis, the core AI Operating System for Your Brand Builders (YBB).
Your primary directive is to provide accurate, real-time business intelligence using your connected database tools.

CRITICAL RULES:
1. NEVER guess or hallucinate numbers, lead counts, or project details.
2. If a user asks for counts, stats, or summaries, you MUST call 'get_business_stats' or 'list_recent_leads'.
3. NEVER say you are "simulating" a query. You have REAL access.
4. If a tool returns data, summarize it accurately and professionally.
5. If no leads exist, state clearly that the database is currently empty.
6. Always maintain the professional, intelligent "Jarvis" persona.
7. NEVER provide fake numbers like "2,147" as a placeholder.
`;

const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
    {
        type: "function",
        function: {
            name: "list_recent_leads",
            description: "Fetches a summary of the most recent inquiries/leads from the database.",
            parameters: { type: "object", properties: {} }
        }
    },
    {
        type: "function",
        function: {
            name: "get_lead_details",
            description: "Fetches full details for a specific inquiry using its unique ID.",
            parameters: {
                type: "object",
                properties: {
                    id: { type: "string", description: "The inquiry ID (e.g. emXag...)" }
                },
                required: ["id"]
            }
        }
    },
    {
        type: "function",
        function: {
            name: "get_business_stats",
            description: "Provides high-level business intelligence including lead counts, status breakdowns, and activity summaries.",
            parameters: { type: "object", properties: {} }
        }
    }
];

export async function POST(req: Request) {
    logJarvis("Incoming Chat Request (OpenAI Backend)");

    if (!process.env.OPENAI_API_KEY) {
        logJarvis("FATAL ERROR: OpenAI API Key missing.");
        return NextResponse.json({ error: "OpenAI API Key missing." }, { status: 500 });
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    try {
        const { messages, context } = await req.json();

        // 1. Format history and current prompt
        let formattedMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages.slice(0, -1).map((m: any) => ({
                role: m.role === 'user' ? 'user' : 'assistant',
                content: m.content
            }))
        ];

        const lastMessage = messages[messages.length - 1].content;
        const prompt = context
            ? `Admin is currently viewing ${context.type} #${context.id}. Request: ${lastMessage}`
            : lastMessage;

        formattedMessages.push({ role: "user", content: prompt });

        logJarvis(`Prompt: ${prompt}`);

        // 2. Initial generation with tool support
        let response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: formattedMessages,
            tools: tools
        });

        // 3. Handle Tool Calls
        let iteration = 0;

        while (response.choices[0].message.tool_calls && iteration < 5) {
            const message = response.choices[0].message;
            const toolCalls = message.tool_calls;

            if (!toolCalls || toolCalls.length === 0) {
                logJarvis(`No more tool calls at iteration ${iteration}`);
                break;
            }

            logJarvis(`Iteration ${iteration}: Found ${toolCalls.length} tool calls`);

            // Append the assistant's tool call message to the conversation
            formattedMessages.push(message);

            for (const call of toolCalls) {
                const { id, function: fn } = call;
                const name = fn.name;
                const args = JSON.parse(fn.arguments || "{}");

                logJarvis(`Executing: ${name}`);

                let data;
                if (name === "list_recent_leads") data = await list_recent_leads();
                else if (name === "get_lead_details") data = await get_lead_details(args.id);
                else if (name === "get_business_stats") data = await get_business_stats();

                logJarvis(`Tool ${name} success. Data sample: ${JSON.stringify(data).substring(0, 50)}`);

                // Append the tool result to the conversation
                formattedMessages.push({
                    role: "tool",
                    tool_call_id: id,
                    name: name,
                    content: JSON.stringify(data)
                });
            }

            // Send tool responses back for the final answer
            response = await openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: formattedMessages,
                tools: tools
            });

            iteration++;
        }

        const finalContent = response.choices[0].message.content || "Jarvis is processing...";
        logJarvis(`Returning response: ${finalContent.substring(0, 40)}...`);

        return NextResponse.json({
            content: finalContent,
            role: 'assistant'
        });

    } catch (err: any) {
        logJarvis(`FATAL ERROR: ${err.message}`);
        console.error("Jarvis Chat Error:", err);
        return NextResponse.json({
            error: "Jarvis ran into an issue.",
            details: err.message || String(err)
        }, { status: 500 });
    }
}
