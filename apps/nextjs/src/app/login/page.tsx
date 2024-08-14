// import AcmeLogo from '@/app/ui/acme-logo';
import  RegisterForm from '@acme/ui/forms/register';
import { Metadata } from 'next';
import Link from 'next/link'
import { Button } from "@acme/ui/button";

import { login, signup } from './actions'

export const metadata: Metadata = {
  title: 'Register',
};
 
export default function LoginPage() {
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