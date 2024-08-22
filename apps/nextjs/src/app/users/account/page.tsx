
import { createClient } from '~/utils/supabase/server'
import AccountForm from "./account";
import { redirect } from 'next/navigation'

export default async function Page() {
    const supabase = await createClient()
    // console.log('supabase from createClient', supabase.auth)

	const { data: { user },} = await supabase.auth.getUser()
	
	console.log('supabase from createClient user', user)
	
    const handleError = (error, _widget) =>{
            setInfo(null);
            setError(error);
    }
    const handleSuccess=(result, widget)=>{
        setInfo(result?.info);
        setError(null);
        widget.close({ quiet: true, });
    } 
    return (
		<AccountForm user={user} />
    );
}
