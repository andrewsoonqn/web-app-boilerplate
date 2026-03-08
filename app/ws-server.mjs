import { WebSocketServer } from "ws";

const port = Number(process.env.WS_PORT ?? 3001);
const server = new WebSocketServer({ port });

server.on("connection", (socket) => {
  socket.send(JSON.stringify({ type: "system", text: "Connected to websocket demo." }));

  const ticker = setInterval(() => {
    if (socket.readyState === socket.OPEN) {
      socket.send(JSON.stringify({ type: "heartbeat", text: `alive ${new Date().toLocaleTimeString()}` }));
    }
  }, 6000);

  socket.on("message", (rawMessage) => {
    let parsed;

    try {
      parsed = JSON.parse(rawMessage.toString());
    } catch {
      parsed = { type: "message", text: rawMessage.toString() };
    }

    const text = typeof parsed.text === "string" ? parsed.text : "";
    socket.send(JSON.stringify({ type: "echo", text: `received: ${text.slice(0, 80)}` }));
  });

  socket.on("close", () => {
    clearInterval(ticker);
  });
});

console.log(`[ws] listening on ws://localhost:${port}`);
