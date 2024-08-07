// import AcmeLogo from '@/app/ui/acme-logo';
import  {Button} from '@acme/ui/button'; 
import  RegisterForm from '@acme/ui/forms/register';
import { Metadata } from 'next';
import Link from 'next/link'

import { login, signup } from './actions'

export const metadata: Metadata = {
  title: 'Register',
};
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
          <Button>vvvvv</Button>
            <Link href="/">
             logo
            </Link>
          </div>
        </div>
            <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Sign up</button>
    </form>
      </div>
    </main>
  );
}