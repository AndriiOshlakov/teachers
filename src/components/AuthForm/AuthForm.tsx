import css from "./AuthForm.module.css";
import * as yup from "yup";

interface AuthFormValues {
  name: string;
  email: string;
  password: string;
}

export default function AuthForm() {
  return <div className={css.authForm}></div>;
}
