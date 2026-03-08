import Link from "next/link";
import { Bot, Database, LayoutDashboard, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: LayoutDashboard,
    title: "Focused workspace",
    description: "A practical split-view page with analytics on the left and chat on the right.",
  },
  {
    icon: Database,
    title: "Supabase-ready backend",
    description: "Route handlers query Postgres and return typed payloads for your frontend.",
  },
  {
    icon: Bot,
    title: "Streaming chat UX",
    description: "Token streaming through SSE plus websocket presence for realtime status.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-8 sm:pt-14">
        <div className="mb-12 flex items-center justify-between">
          <p className="text-sm font-semibold tracking-tight">Launchpad Starter</p>
          <Badge variant="secondary">Light mode</Badge>
        </div>

        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <Badge className="w-fit gap-2 bg-primary/15 text-primary hover:bg-primary/15">
              <Sparkles className="h-3.5 w-3.5" />
              Next project starter
            </Badge>

            <div className="space-y-4">
              <h1 className="animate-fade-up text-4xl font-semibold tracking-tight sm:text-5xl">
                Build fast with a polished landing page, data dashboard, and live chat demo.
              </h1>
              <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
                This starter pairs a refined frontend with backend endpoints, Supabase data, and token-by-token streaming so you can ship prototypes fast.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/workspace">Get Started</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/workspace">Open Workspace</Link>
              </Button>
            </div>
          </div>

          <Card className="border-primary/20 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>What you get out of the box</CardTitle>
              <CardDescription>Production-shaped scaffold for hackathons and MVPs</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {features.map((feature) => {
                const Icon = feature.icon;
                return (
                  <div key={feature.title} className="rounded-lg border bg-background p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <p className="text-sm font-semibold">{feature.title}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
