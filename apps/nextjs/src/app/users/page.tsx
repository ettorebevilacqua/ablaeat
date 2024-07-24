import { UsersList } from "~/app/_components/users";
import { Suspense } from "react";
import { HydrateClient } from "~/trpc/server";

export const metadata: Metadata = {
  title: 'Users list',
};

export default function UsersPage() {
  return (
    <HydrateClient>
      <main className="container h-screen py-8">
        <h2 className="text-5xl font-extrabold tracking-tight sm:text-[2rem] py-6">
          Users <span className="text-primary">List</span>
        </h2>
        <div className="flex w-full flex-col gap-4">
          <Suspense fallback={
            <div className="flex w-full flex-col gap-4">
              Loading
            </div>
          } >
          <UsersList />
          </Suspense>

        </div>
      </main>
    </HydrateClient>
  );
}


        // <h2 className="text-5xl font-extrabold tracking-tight sm:text-[2rem] py-6"">
        //     Users <span className="text-primary">List</span>
        // </h2>

        //   <div className="flex w-full flex-col gap-4">
        //     <Suspense fallback={
        //             <div className="flex w-full flex-col gap-4">
        //               Loading
        //             </div>
        //           }
        //         >
        //     <UsersList />
        //   </Suspense>
            
        //   </div>