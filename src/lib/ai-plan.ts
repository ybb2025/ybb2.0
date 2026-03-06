import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const PROMPT_TEMPLATE = `
You are a senior product architect, software engineer, and UI/UX planner.

Your task is to analyze the following project requirements and generate a complete development blueprint for a web project.
The output will later be used for automated prompt refinement and AI-driven development, so the response must be clear, structured, and detailed.

PROJECT REQUIREMENTS:
[INSERT_DATA]

Your response must contain the following sections:

1. PROJECT OVERVIEW
   Explain the purpose of the project, the business goal, and the target users.

2. USER ROLES
   Identify all user roles involved in the system (example: Admin, Customer, Staff, Student, Patient etc.) and describe what each role does.

3. PAGE STRUCTURE
   List all required pages or screens for the application or website.

4. CORE FEATURES
   List the major functionality required for the project.

5. OPTIONAL FEATURES
   Suggest useful features that could improve the system.

6. UI / UX STRUCTURE
   Describe the layout sections for each page such as:
   Hero section
   Navigation
   Content sections
   Forms
   Cards
   Dashboards

7. DATABASE ENTITIES
   Suggest the main database tables or collections required.
   For each entity include:
   * name
   * fields
   * relationships if needed

8. SYSTEM MODULES
   Break the system into logical modules such as:
   Authentication
   User Management
   Booking System
   Content Management
   Analytics

9. TECH STACK RECOMMENDATION
   Suggest a modern stack for building the system including:
   Frontend framework
   Backend
   Database
   Authentication
   Hosting platform

10. DEVELOPMENT ROADMAP
    Provide step-by-step instructions a developer could follow to build the project from scratch.

11. FINAL BUILD PROMPT
    Create a clean, concise development prompt that can later be used in a website builder or AI development tool to generate the project.

FORMAT REQUIREMENTS
Structure the output clearly using headings.
At the end also produce a structured JSON summary with:
{
  "project_name": "string",
  "pages": ["string"],
  "features": ["string"],
  "modules": ["string"],
  "database_entities": ["string"],
  "recommended_stack": ["string"]
}
Wait until the very end to output the JSON summary block (you must wrap it in \`\`\`json block for safe parsing).
`;

export async function generateProjectSummary(data: any): Promise<{ aiSummary: string, aiSummaryData: any }> {
    if (!process.env.GEMINI_API_KEY) {
        console.warn("GEMINI_API_KEY is missing. Skipping AI summary generation.");
        return { aiSummary: "", aiSummaryData: null };
    }

    try {
        const inputStr = `
Project Type: ${data.projectType}
Stage: ${data.stage}
Budget: ${data.budget}
Timeline: ${data.timeline}
Name: ${data.fullName}
Company: ${data.companyName}
Goal / Description: ${data.description}
        `.trim();

        const finalPrompt = PROMPT_TEMPLATE.replace("[INSERT_DATA]", inputStr);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: finalPrompt,
        });

        const rawText = response.text || "";

        // Attempt to safely extract the JSON block if the model generated it successfully
        let finalJson = {};
        try {
            const jsonMatch = rawText.match(/```json\n([\s\S]*?)\n```/);
            if (jsonMatch && jsonMatch[1]) {
                finalJson = JSON.parse(jsonMatch[1]);
            }
        } catch (e) {
            console.warn("Could not parse JSON summary block from Gemini output");
        }

        return {
            aiSummary: rawText,
            aiSummaryData: finalJson
        };
    } catch (err) {
        console.error("Gemini Generation Error:", err);
        return { aiSummary: "AI summary generation failed.", aiSummaryData: null };
    }
}
