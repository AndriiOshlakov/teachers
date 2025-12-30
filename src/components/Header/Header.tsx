import { Link } from "react-router-dom";
import css from "./Header.module.css";
import { useState } from "react";
import Modal from "../Modal/Modal";
import AuthForm from "../AuthForm/AuthForm";

// interface Props {
//   onLogin: () => void;
//   onRegister: () => void;
// }

export default function Header() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
          <button
            className={css.login}
            onClick={() => setIsLoginOpen(!isLoginOpen)}
          >
            <svg width={20} height={20}>
              <use href="/symbol-defs.svg#log-in-01" />
            </svg>
            <p>Log in</p>
          </button>
          <button
            className={css.reg}
            onClick={() => setIsAuthOpen(!isAuthOpen)}
          >
            Registration
          </button>
        </div>
      </div>
      {isAuthOpen && (
        <Modal onClose={() => setIsAuthOpen(false)} children={<AuthForm />} />
      )}
      {isLoginOpen && <Modal onClose={() => setIsLoginOpen(!isLoginOpen)} />}
    </header>
  );
}
