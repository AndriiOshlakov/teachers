import type { Teacher } from "../../types/TeacherType";
import Button from "../Button/Button";
import css from "./BookForm.module.css";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

const bookFormSchema = yup.object({
  reason: yup.string().required("Choose a reason"),
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
});

export type BookFormValues = {
  reason: string;
  name: string;
  email: string;
  phone: string;
};

type Props = {
  teacher: Teacher;
  onClose: () => void;
};

export default function BookForm({ teacher, onClose }: Props) {
  const [isBooked, setIsBooked] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormValues>({
    resolver: yupResolver(bookFormSchema),
    defaultValues: {
      reason: "career",
    },
  });

  const onSubmit = (data: BookFormValues) => {
    console.log(data);

    setIsBooked(true);

    setTimeout(() => {
      setIsBooked(false);
      onClose();
    }, 5000);
  };
  return (
    <div>
      {!isBooked && (
        <div className={css.bookForm}>
          <h2>Book trial lesson</h2>
          <p>
            Our experienced tutor will assess your current language level,
            discuss your learning goals, and tailor the lesson to your specific
            needs.
          </p>
          <div className={css.teacher}>
            <div className={css.teacherAva}>
              <img src={teacher.avatar_url} alt="teacher avatar" />
            </div>
            <div className={css.teacherName}>
              <p>Your teacher</p>
              <span>
                {teacher.name} {teacher.surname}
              </span>
            </div>
          </div>
          <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <legend>What is your main reason for learning English?</legend>
              <label>
                <input type="radio" value="career" {...register("reason")} />
                <svg width={24} height={24} className={css.radio}>
                  <use href="/symbol-defs.svg#RadioButton" />
                </svg>
                <svg width={24} height={24} className={css.ring}>
                  <use href="/symbol-defs.svg#ring" />
                </svg>
                Career and business
              </label>
              <label>
                <input type="radio" {...register("reason")} value="kids" />
                <svg width={24} height={24} className={css.radio}>
                  <use href="/symbol-defs.svg#RadioButton" />
                </svg>
                <svg width={24} height={24} className={css.ring}>
                  <use href="/symbol-defs.svg#ring" />
                </svg>
                Lesson for kids
              </label>
              <label>
                <input type="radio" {...register("reason")} value="abroad" />
                <svg width={24} height={24} className={css.radio}>
                  <use href="/symbol-defs.svg#RadioButton" />
                </svg>
                <svg width={24} height={24} className={css.ring}>
                  <use href="/symbol-defs.svg#ring" />
                </svg>
                Living abroad
              </label>
              <label>
                <input type="radio" {...register("reason")} value="exams" />
                <svg width={24} height={24} className={css.radio}>
                  <use href="/symbol-defs.svg#RadioButton" />
                </svg>
                <svg width={24} height={24} className={css.ring}>
                  <use href="/symbol-defs.svg#ring" />
                </svg>
                Exams and coursework
              </label>
              <label>
                <input type="radio" {...register("reason")} value="travel" />
                <svg width={24} height={24} className={css.radio}>
                  <use href="/symbol-defs.svg#RadioButton" />
                </svg>
                <svg width={24} height={24} className={css.ring}>
                  <use href="/symbol-defs.svg#ring" />
                </svg>
                Culture, travel or hobby
              </label>
              {errors.reason && (
                <p className={css.error}>{errors.reason.message}</p>
              )}
            </fieldset>
            <input type="text" placeholder="Full Name" {...register("name")} />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
            <input type="email" placeholder="Email" {...register("email")} />
            {errors.email && (
              <p className={css.error}>{errors.email.message}</p>
            )}
            <input
              type="tel"
              placeholder="Phone number"
              {...register("phone")}
            />
            {errors.phone && (
              <p className={css.error}>{errors.phone.message}</p>
            )}
            <Button text="Book" type="submit" />
          </form>
        </div>
      )}
      {isBooked && (
        <p style={{ fontSize: "24px", fontWeight: "500" }}>
          Ваше зфмовлення прийнято. Наш адміністратор скоро з вами зв'яжеться.
        </p>
      )}
    </div>
  );
}
