import { Link } from "react-router-dom";
import css from "./Header.module.css";

interface Props {
  onLogin: () => void;
  onRegister: () => void;
}

export default function Header({ onLogin, onRegister }: Props) {
  return (
    <header className={css.header}>
      <div className={css.headerContainer}>
        <nav className={css.nav}>
          <Link to="/" className={css.logo}>
            <svg width={28} height={28}>
              <use href="/symbol-defs.svg#ukraine" />
            </svg>
            <span> LearnLingo</span>
          </Link>
          <div className={css.navBox}>
            <Link to="/">Home</Link>
            <Link to="/teachers">Teachers</Link>
          </div>
        </nav>
        <div className={css.auth}>
          <button className={css.login} onClick={onLogin}>
            <svg width={20} height={20}>
              <use href="/symbol-defs.svg#log-in-01" />
            </svg>
            <p>Log in</p>
          </button>
          <button className={css.reg} onClick={onRegister}>
            Registration
          </button>
        </div>
      </div>
    </header>
  );
}
