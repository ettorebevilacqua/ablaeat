"use client";

import { api } from "~/trpc/react";
import { toast } from "@acme/ui/toast";
import { Button } from "@acme/ui/button";

const renderLoading = ()=>"<h2>loading...</h2>"

export function UserCard(props: {
  user: RouterOutputs["user"]["all"][number];
}) {
  const utils = api.useUtils();
  const deletePost = api.user.delete.useMutation({
    onSuccess: async () => {
      await utils.user.invalidate();
    },
    onError: (err) => {
      toast.error(
        err.data?.code === "UNAUTHORIZED"
          ? "You must be logged in to delete a post"
          : "Failed to delete post",
      );
    },
  });

  return (
    <div className="flex flex-row rounded-lg bg-muted p-4 gap-4">
       <div >
        <img src={props.user.image} width="70" heigth="70"/>
      </div>

      <div >
        <h4 className="text-2xl font-bold text-primary">{props.user.name}</h4>
        <p className="mt-2 text-sm">{props.user.email}</p>
      </div>
      <div className="flex-grow">
        Email Verified : {props.user.emailVerified ? 'yes' : 'no'}
      </div>
      <div>
        <Button
          variant="ghost"
          className="cursor-pointer text-sm font-bold uppercase text-primary hover:bg-transparent hover:text-white"
          onClick={() => deletePost.mutate(props.user.id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export function UsersList() {

  const [users, aa] = api.user.all.useSuspenseQuery();
  console.log('users ', users, aa);
  if (!aa.isFetched){
    return renderLoading()
  }

  if (!!aa.error){
    return <h2>Error on data loading {aa.error}</h2>
  }

  if (users.length === 0) {
    return (
      <div className="relative flex w-full flex-col gap-4">
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10">
          <p className="text-2xl font-bold text-white">No users yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-4"> 
    {users.map((p) => { return <UserCard key={p.id} user={p} /> })}
    </div>
  );
}