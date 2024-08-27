import PlateList from "./plateList"
import { Button } from "@acme/ui/button";
import { Input } from "@acme/ui/input";
import { Label } from "@acme/ui/";

export type Plate = {title:string | null; img:string | null; desc:string | null; like:z.number | null; } 

export default async function Page() {
    return(
   <section>
      <div className="flex items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          
          <h2 className="text-center text-2xl font-bold leading-tight">
           My prefer Dishes
          </h2>
          
			<PlateList />
        </div>
      </div>
    </section>
    )
}
