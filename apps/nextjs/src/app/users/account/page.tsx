import AccountForm from "./account";
import { redirect } from 'next/navigation'
import { getUser } from "@acme/auth";

export default async function Page() {
     const { user, error } = await getUser(); 

  /*  const handleError = (error, _widget) =>{
            setInfo(null);
            setError(error);
    }
    const handleSuccess=(result, widget)=>{
        setInfo(result?.info);
        setError(null);
        widget.close({ quiet: true, });
    } */
    return (
		<AccountForm user={user} />
    );
}
