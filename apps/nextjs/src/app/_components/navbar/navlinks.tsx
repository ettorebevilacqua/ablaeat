// 'use client';

import { auth, signIn, signOut } from "@acme/auth";
import Link from 'next/link';
import Logo from "~/app/_components/icons/Logo";
import s from './navbar.module.css';
import Logout  from "~/app/users/Logout";
import LogIn  from "~/app/users/SignIn";
import { getUser } from "@acme/auth";

interface NavlinksProps {
  user?: any;
}

export default async function Navlinks({ user }: NavlinksProps) {
  const session = await auth();
  return (
    <div className="relative flex flex-row justify-between py-4 align-center md:py-6">
      <div className="flex items-center flex-1">
        <Link href="/" className={s.logo} aria-label="Logo">
          <Logo />
        </Link>
        <nav className="ml-6 space-x-2 lg:block">
          <Link href="/" className={s.link}>
            Home
          </Link>

        </nav>
      </div>
      { 1===1 && (
      <div className="flex justify-end space-x-8">
        <Link href="/users/login" className={s.link}>
            Login
          </Link>
           <Link href="/users/account" className={s.link}>
            Account
          </Link>
      </div>
      )
      }

     
    </div>
  );
}
