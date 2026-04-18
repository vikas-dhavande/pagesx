import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SiteHeader } from "@/components/site-header";
import { ChatClient } from "./chat-client";

export default async function ChatPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/");
  }

  return (
    <div className="flex h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex-1 overflow-hidden relative">
        <ChatClient />
      </main>
    </div>
  );
}
