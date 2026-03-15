import { NextRequest } from 'next/server';

const TOKEN = process.env.WHATSAPP_TOKEN;
const PHONE_ID = process.env.PHONE_NUMBER_ID;

async function sendReply(to: string, text: string) {
  if (!TOKEN || !PHONE_ID) {
    console.error("Missing WHATSAPP_TOKEN or PHONE_NUMBER_ID in environment variables");
    return;
  }

  try {
    const response = await fetch(`https://graph.facebook.com/v19.0/${PHONE_ID}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: to,
        text: { body: text }
      })
    });

    const result = await response.json();
    console.log("WhatsApp Send Response:", result);
  } catch (error) {
    console.error("Error sending WhatsApp reply:", error);
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  const VERIFY_TOKEN = "ybb_verify_123";

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }

  return new Response("Verification failed", { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("WhatsApp webhook event received:", JSON.stringify(body, null, 2));

    const change = body.entry?.[0]?.changes?.[0]?.value;
    const messageObj = change?.messages?.[0];

    if (messageObj) {
      const from = messageObj.from;
      const messageText = messageObj.text?.body;

      console.log(`Received message: "${messageText}" from: ${from}`);

      if (messageText?.toLowerCase().includes("hi")) {
        await sendReply(
          from,
          "Welcome to YBB 🚀\n\n1️⃣ Website Development\n2️⃣ WhatsApp Automation\n3️⃣ SaaS Solutions"
        );
      } else if (messageText === "1") {
        await sendReply(from, "Our Website Packages range from basic portfolios to fully custom enterprise systems. Check them out at yourbrandbuilders.com/work");
      } else if (messageText === "2") {
        await sendReply(from, "WhatsApp Automation is the future! We help you build chatbots, lead capture flows, and CRM integrations.");
      } else if (messageText === "3") {
        await sendReply(from, "We build custom SaaS products from zero to scale. Let's discuss your next big idea!");
      }
    }

    return new Response("EVENT_RECEIVED", { status: 200 });
  } catch (error) {
    console.error("Webhook POST Error:", error);
    return new Response("Error", { status: 500 });
  }
}
