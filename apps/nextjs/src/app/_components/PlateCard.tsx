import UploadImg  from '~/app/_components/UploadImg'
import { Button } from "@acme/ui/button";
import { Card, CardTitle, CardDescription, CardFooter, CardContent } from "@acme/ui/card";
import Image from 'next/image'

export type PropsCard = { user:any; plate:Plate; isValid: boolean; isSubmitting:boolean; onUpload:(url:string)=>never }

export default function PlateCard({user, plate, isValid, isSubmitting, onUpload}:PropsCard) {
  return (
  <Card size="3">
	 <CardTitle className="p-4 justify-center text-center text-2xl">
		<h2>{plate.title}</h2>
	 </CardTitle>
	 <CardContent>
		 <div className="">   
			<Image
				src={plate.img}
				alt="img"
				
				layout="fill"
			    className="!relative"
			/>
		</div>
	 </CardContent>
	 <CardDescription>
	 card descr
	         <Button
          variant="ghost"
          className="cursor-pointer text-sm font-bold uppercase text-primary hover:bg-transparent hover:text-white"
          onClick={() => deletePost.mutate(props.post.id)}
        >
          Delete
        </Button>
	 </CardDescription>
	<CardFooter>
		<p className="mt-2 text-sm">{plate.descr}</p>
	</CardFooter>
</Card>
  );
}
