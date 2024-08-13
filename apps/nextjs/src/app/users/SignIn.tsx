
    "use server";

    import { auth, signIn, signOut } from "@acme/auth";
    import { Button } from "@acme/ui/button";
    import Link from 'next/link'

    export default async function LogIn() {

       return   <form>
           
        <Button
          size="lg"
          formAction={async () => {
            "use server";
            await signIn("discord");
          }}
        >
          Sign in
        </Button>

          <Link href="/users/account">
            Register
          </Link>
      </form>
    }