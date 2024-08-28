import { Suspense } from "react";
import Link from "next/link";

import { api, HydrateClient } from "~/trpc/server";
import { AuthShowcase } from "./_components/auth-showcase";

export const runtime = "edge";

export default function HomePage() {
  // You can await this here if you don't want to show Suspense fallback below
  // void api.post.all.prefetch();

  return (
    <HydrateClient>
      <main className="container h-screen py-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            ABLA<span className="text-primary">EAT</span>
          </h1>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="https://"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">First Steps→</h3>
              <div className="text-lg">
                Just the basics - Everything about you
              </div>
            </Link>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
              href="https://"
              target="_blank"
            >
              <h3 className="text-2xl font-bold">About food →</h3>
              <div className="text-lg">Learn more about food.</div>
            </Link>
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}
