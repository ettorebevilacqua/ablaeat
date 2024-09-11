import OffersList from "./OfferListAll"
import { // api ,
	HydrateClient } from "~/trpc/server";

export default function Page() {
  return (
   <HydrateClient>
	<OffersList />
   </HydrateClient>
  )
}