import s from './navbar.module.css';
import Navlinks from './navlinks';

export default async function Navbar() {
  return (
    <nav className={s.root}>
      <a href="#skip" className="sr-only focus:not-sr-only">
        Skip to content
      </a>
      <div className="max-w-6xl px-6 mx-auto">
        <Navlinks />
      </div>
    </nav>
  );
}
