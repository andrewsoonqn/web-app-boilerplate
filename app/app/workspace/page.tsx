import Link from "next/link";

import { ChatPanel } from "@/components/chat-panel";
import { DashboardPanel } from "@/components/dashboard-panel";

export default function WorkspacePage() {
  return (
    <main className="flex h-screen flex-col overflow-hidden">
      <nav className="w-full border-b">
        <div className="mx-auto flex max-w-7xl items-center px-6 py-4">
          <Link href="/" className="text-sm font-semibold uppercase tracking-widest">
            logo
          </Link>
        </div>
      </nav>

      <div className="mx-auto flex w-full max-w-7xl min-h-0 flex-1 flex-col space-y-6 px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Workspace</h1>
            <p className="text-sm text-muted-foreground">Dashboard data + compact chat interface, both backed by API routes.</p>
          </div>
        </div>

        <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-[1.7fr_0.8fr]">
          <div className="min-h-0 overflow-y-auto pr-3">
            <DashboardPanel />
          </div>
          <ChatPanel />
        </div>
      </div>
    </main>
  );
}
