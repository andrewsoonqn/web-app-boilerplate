import Link from "next/link";

import { ChatPanel } from "@/components/chat-panel";
import { DashboardPanel } from "@/components/dashboard-panel";
import { Button } from "@/components/ui/button";

export default function WorkspacePage() {
  return (
    <main className="min-h-screen px-6 py-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Workspace</h1>
            <p className="text-sm text-muted-foreground">Dashboard data + compact chat interface, both backed by API routes.</p>
          </div>
          <Button asChild variant="outline">
            <Link href="/">Back to landing</Link>
          </Button>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.45fr_0.85fr]">
          <DashboardPanel />
          <ChatPanel />
        </div>
      </div>
    </main>
  );
}
