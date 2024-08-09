
    import { Button } from "@acme/ui/button";

    export default function Logout() {

       return   <form>
            <Button
              size="lg"
              formAction={async () => {
                await signOut();
              }}
            >
              Sign out
            </Button>
      </form>
    }