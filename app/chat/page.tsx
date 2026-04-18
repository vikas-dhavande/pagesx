"use client";

import { AgentChat } from "@21st-sdk/react";
import { SiteHeader } from "@/components/site-header";

export default function ChatPage() {
  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1 overflow-hidden relative">
        <AgentChat 
          agentId="my-agent" 
          tokenEndpoint="/api/agent/token"
          className="h-full border-t border-[color:var(--border)]"
          // Monochrome theme overrides if supported by the component
        />
      </main>
    </div>
  );
}
