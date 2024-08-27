import AccountForm from "./account";
import { redirect } from 'next/navigation'

export default async function Page() {

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
		<AccountForm />
    );
}
