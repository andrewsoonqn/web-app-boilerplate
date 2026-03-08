import { NextRequest } from "next/server";

const encoder = new TextEncoder();

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function makeReply(message: string) {
  const prompt = message.toLowerCase();

  if (prompt.includes("best") && prompt.includes("mpg")) {
    return "From the sample set, Hyundai and Kia entries trend high on MPG. You can validate this with a grouped query in the dashboard API.";
  }

  if (prompt.includes("price")) {
    return "Average price in the sample set is in the low twenty-thousands. You can compare by make from the left-side table.";
  }

  return "This chat is streaming through SSE from a backend route. It can answer basic dataset questions and demonstrate token-by-token UI updates.";
}

export async function GET(request: NextRequest) {
  const message = request.nextUrl.searchParams.get("message") ?? "";
  const reply = makeReply(message);
  const tokens = reply.split(" ");

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      for (const token of tokens) {
        const payload = `data: ${JSON.stringify({ delta: `${token} ` })}\n\n`;
        controller.enqueue(encoder.encode(payload));
        await sleep(40);
      }

      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
