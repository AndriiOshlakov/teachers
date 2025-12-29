import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";

interface Props {
  onLogin: () => void;
  onRegister: () => void;
}

export default function MainLayout({ onLogin, onRegister }: Props) {
  return (
    <>
      <Header onLogin={onLogin} onRegister={onRegister} />
      <Outlet />
    </>
  );
}
