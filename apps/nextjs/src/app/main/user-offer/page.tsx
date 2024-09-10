import OffersList from "./OfferList"
import { // api ,
	HydrateClient } from "~/trpc/server";

export default function Page() {
  return (
   <HydrateClient>
	<OffersList />
   </HydrateClient>
  )
}
