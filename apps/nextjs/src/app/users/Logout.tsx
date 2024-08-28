"use client";

import { useRouter } from "next/navigation";

import { Button } from "@acme/ui/button";

import { createClient } from "~/utils/supabase/client";

export default function Logout() {
  const supabase = createClient();
  const router = useRouter();
  return (
    <Button
      size="lg"
      onClick={() => {
        supabase.auth.signOut();
        router.push("/");
      }}
    >
      Sign out
    </Button>
  );
}
