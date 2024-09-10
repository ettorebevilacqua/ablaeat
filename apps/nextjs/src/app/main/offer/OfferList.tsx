"use client";

import { useCallback, useEffect, useState } from "react";

import type { Plate } from "~/app/_components/PlateCard";
import { OfferCardForm, OfferCard } from "~/app/_components/OfferCard";
import { useAuth } from "~/hooks/useAuth";
import { createClient } from "~/utils/supabase/client";

export default function OffersList() {
  const supabase = createClient();
  const [dataList, setDataList] = useState<offer[] | null>(null);
  const { user } = useAuth();

  const getData = useCallback(async () => {
    try {
      const { data, error, status } = await supabase
        .from("offers")
        .select(`id, title, img, descr, like`)
        .eq("offer_id", user?.id);

      if (error && status !== 406) {
        console.log("ERROR ACCOUNT", error);
        // throw error
      }

      if (data) {
        console.log("fill form ", data);
        // reset(data);
        setDataList(data as unknown as offer[]);
      }
    } catch (error) {
      console.log("ERROR ACCOUNT catch", error);
      // alert('Error loading user data!')
    } finally { /* empty */ }
  }, [user, supabase]);

  const onSaveOffer = () => getData();

  useEffect(() => {
    void getData();
  }, [user, getData]);

  if (!user) return <h2>User not found</h2>

  return (
    <section>
      <div className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <OfferCardForm user={user} onSave={onSaveOffer} />
          <div>
            {!dataList
              ? "Empity"
              : dataList.map((offer: Offer) => (
                  <OfferCard
                    key={offer.id}
                    offer={offer}
                    onSave={onSaveOffer}
                  />
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
