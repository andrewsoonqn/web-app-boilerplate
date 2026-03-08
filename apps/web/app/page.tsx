import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <section className="w-full max-w-3xl px-6 py-12">
        <div className="space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="animate-fade-up text-4xl font-semibold tracking-tight sm:text-5xl">
              Build fast with a polished landing page, data dashboard, and live chat demo.
            </h1>
            <p className="mx-auto max-w-xl text-base text-muted-foreground sm:text-lg">
              This starter pairs a refined frontend with backend endpoints, Supabase data, and token-by-token streaming so you can ship prototypes fast.
            </p>
          </div>

            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/workspace">Get Started</Link>
              </Button>
            </div>
        </div>
      </section>
    </main>
  );
}
