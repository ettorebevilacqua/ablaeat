import s from './navbar.module.css';
import Navlinks from './navlinks';
import { auth } from "@acme/auth";

export default async function Navbar() {
  const session = await auth();

 const user = session && session.user.name

  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-6xl px-6 mx-auto">
        <Navlinks user={user} />
      </div>
    </nav>
  );
}