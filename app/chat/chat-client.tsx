"use client";

import { useMemo } from "react";
import { AgentChat, createAgentChat } from "@21st-sdk/react";
import { useChat } from "@ai-sdk/react";

export function ChatClient() {
  const agentChat = useMemo(
    () =>
      createAgentChat({
        agent: "my-agent",
        tokenUrl: "/api/agent/token",
      }),
    []
  );

  const { messages, sendMessage, status, stop } = useChat({
    chat: agentChat,
  });

  return (
    <AgentChat
      messages={messages}
      onSend={sendMessage}
      status={status}
      onStop={stop}
      className="h-full border-t border-[color:var(--border)]"
    />
  );
}
