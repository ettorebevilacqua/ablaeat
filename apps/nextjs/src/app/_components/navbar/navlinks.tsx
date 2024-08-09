'use client';

import Link from 'next/link';
import Logo from "~/app/_components/icons/Logo";
import s from './navbar.module.css';
import Logout  from "~/app/users/Logout";

interface NavlinksProps {
  user?: any;
}

export default function Navlinks({ user }: NavlinksProps) {

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
          {user && (
            <Link href="/users/account" className={s.link}>
              Account
            </Link>
          )}
        </nav>
      </div>
      <div className="flex justify-end space-x-8">
        {user ? (
            <Logout />
        ) : (
          <Link href="/signin" className={s.link}>
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
}