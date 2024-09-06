"use client";

import { useRouter } from "next/navigation";
import { Button } from "@acme/ui/button";
import { createClient } from "~/utils/supabase/client";
import { useAuth } from "~/hooks/useAuth";

export default function Logout() {
  const supabase = createClient();
  const router = useRouter();
  const { reload } = useAuth();

  return (
    <Button
      size="lg"
      onClick={() => {
        void supabase.auth.signOut();
        void reload();
        router.push("/");
      }}
    >
      Sign out
    </Button>
  );
}
