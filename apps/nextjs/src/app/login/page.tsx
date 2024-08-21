// import AcmeLogo from '@/app/ui/acme-logo';
import  RegisterForm from '@acme/ui/forms/register';
import { Metadata } from 'next';
import Link from 'next/link'
import { Button } from "@acme/ui/button";

import { login, signup } from './actions'

import { createClient } from '~/utils/supabase/client'

export const metadata: Metadata = {
  title: 'Register',
};

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();
  
  const dataForm = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }
  
  const onSubmit = async (data: LoginInput) => {
	 const { data, error } = await supabase.auth.signInWithPassword(dataForm)
    const result = await signIn(data);
    if (error) {
      setError(result.error);
    }
  };
  
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
      <form>
      
      <div className="flex flex-row gap-4">
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      </div>

      <div className="flex flex-row gap-4">
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      </div>
      <div className="flex flex-row gap-4">
      <Button formAction={login}>Log in</Button>
      <Button formAction={signup}>Sign up</Button>
      </div>
    </form>
      </div>
    </main>
  );
}
