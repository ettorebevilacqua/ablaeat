'use client';

import React, { useState, useContext } from 'react'
import Link from 'next/link';
import Logo from "~/app/_components/icons/Logo";
import s from './navbar.module.css';
import Logout  from "~/app/users/Logout";
import LogIn  from "~/app/users/SignIn";
import DropDownAvatar from "./dropDownAvatar"
import { useAuth } from '~/hooks/useAuth'

export default function Navlinks() {
  const { user, error } = useAuth();

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
          {!user ? (
			<Link href="/users/login" className={s.link}>
				Login
			</Link>)
		:
		<>
           <Link href="/users/account" className={s.link}>
				Account
			</Link>
       <Link href="/users/dishes" className={s.link}>
				Dishes
			</Link>
			
          <DropDownAvatar user={user}/>
          <Logout />
           </>
          }
      </div>
      )
      }

     
    </div>
  );
}
