
    "use server";
    import { auth, signIn, signOut } from "@acme/auth";
    import { Button } from "@acme/ui/button";

    export default async function Logout() {

       return   <form>
            <Button
              size="lg"
              formAction={async () => {
                "use server";
                await signOut();
              }}
            >
              Sign out
            </Button>
      </form>
    }