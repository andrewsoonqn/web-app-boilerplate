"use client";

import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type WsEvent = {
  type: string;
  text: string;
};

export function ChatPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro",
      role: "assistant",
      content: "Hi - I can summarize your cars dataset. Ask something like: Which brand has the best highway MPG?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [, setWsStatus] = useState("disconnected");
  const [wsEvents, setWsEvents] = useState<WsEvent[]>([]);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3001");
    wsRef.current = ws;
    setWsStatus("connecting");

    ws.onopen = () => {
      setWsStatus("connected");
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(String(event.data)) as WsEvent;
        setWsEvents((prev) => [payload, ...prev].slice(0, 3));
      } catch {
        setWsEvents((prev) => [{ type: "message", text: String(event.data) }, ...prev].slice(0, 3));
      }
    };

    ws.onerror = () => {
      setWsStatus("error");
    };

    ws.onclose = () => {
      setWsStatus("closed");
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) {
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };
    const assistantMessageId = crypto.randomUUID();

    setMessages((prev) => [...prev, userMessage, { id: assistantMessageId, role: "assistant", content: "" }]);
    setInput("");
    setIsStreaming(true);

    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({ type: "user_prompt", text: trimmed }));
    }

    const streamUrl = `/api/chat/stream?message=${encodeURIComponent(trimmed)}`;
    const eventSource = new EventSource(streamUrl);

    eventSource.onmessage = (event) => {
      if (event.data === "[DONE]") {
        eventSource.close();
        setIsStreaming(false);
        return;
      }

      try {
        const payload = JSON.parse(event.data) as { delta: string };
        setMessages((prev) =>
          prev.map((message) =>
            message.id === assistantMessageId
              ? {
                  ...message,
                  content: message.content + payload.delta,
                }
              : message
          )
        );
      } catch {
        eventSource.close();
        setIsStreaming(false);
      }
    };

    eventSource.onerror = () => {
      eventSource.close();
      setIsStreaming(false);
    };
  };

  return (
    <Card className="flex h-full min-h-0 flex-col">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <CardTitle>Assistant</CardTitle>
            <CardDescription>Ask questions about the dataset.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex min-h-0 flex-1 flex-col gap-4">
        <div className="min-h-0 flex-1 space-y-3 overflow-y-auto rounded-md border bg-muted/20 p-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={message.role === "user" ? "ml-auto max-w-[90%] rounded-md bg-primary p-2 text-sm text-primary-foreground" : "max-w-[90%] rounded-md bg-background p-2 text-sm"}
            >
              {message.content || (isStreaming && message.role === "assistant" ? "..." : "")}
            </div>
          ))}
        </div>

        <div className="rounded-md border p-2">
          <p className="mb-2 text-xs text-muted-foreground">WebSocket events</p>
          <div className="space-y-1">
            {wsEvents.length === 0 ? (
              <p className="text-xs text-muted-foreground">No events yet.</p>
            ) : (
              wsEvents.map((evt, idx) => (
                <p key={`${evt.type}-${idx}`} className="text-xs text-muted-foreground">
                  {evt.type}: {evt.text}
                </p>
              ))
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <Input
            placeholder="Ask about the dataset..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                sendMessage();
              }
            }}
            aria-label="Chat input"
          />
          <Button onClick={sendMessage} disabled={isStreaming || input.trim().length === 0}>
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
