import s from './navbar.module.css';
import Navlinks from './navlinks';
import { getUser } from "@acme/auth";
    
export default async function Navbar() {
	const { user, error } = await getUser(); 
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
