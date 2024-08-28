"use server";

import Link from "next/link";

import { auth, signIn, signOut } from "@acme/auth";
import { Button } from "@acme/ui/button";

export default async function LogIn() {
  return (
    <form>
      <Button
        size="lg"
        formAction={async () => {
          "use server";
          await signIn("discord");
        }}
      >
        Sign in
      </Button>

      <Link href="/users/account">Register</Link>
    </form>
  );
}
