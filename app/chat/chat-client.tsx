"use client";

import { AgentChat } from "@21st-sdk/react";

export function ChatClient() {
  return (
    <AgentChat 
      agentId="my-agent" 
      tokenEndpoint="/api/agent/token"
      className="h-full border-t border-[color:var(--border)]"
      // Monochrome theme overrides if supported by the component
    />
  );
}
