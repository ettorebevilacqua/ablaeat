"use client"

import { Suspense } from "react";
import { api } from "~/trpc/react";

export default function OffersList() {
  const [offers] = api.offers.all.useSuspenseQuery();
  console.log(offers);

  if (offers.length === 0) {
    return (
      <div className="relative flex w-full flex-col gap-4">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10">
          <p className="text-2xl font-bold text-white">No posts yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4">
    list
      {offers.map((p) => {
        return <p  key={p.id}> key={p.id} </p>;
      })}
    </div>
  );
}
