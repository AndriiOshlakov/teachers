import type { Teacher } from "../../types/TeacherType";
import css from "./Teacher.module.css";

interface Props {
  teacher: Teacher;
}

export default function TeacherComponent({ teacher }: Props) {
  return (
    <div className={css.teacherContainer}>
      <div className={css.avatarBox}>
        <img
          src={teacher.avatar_url}
          alt="Teacher's avatar"
          className={css.avatar}
        />
      </div>
      <div className={css.container}>
        <div className={css.box}>
          <p>Languages</p>
          <div className={css.wrapper}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg
                width={16}
                height={16}
                style={{ stroke: "black", fill: "transparent" }}
              >
                <use href="/symbol-defs.svg#book-open-01" />
              </svg>
              <p>Lessons online</p>
            </div>
            <p>Lessons done: {teacher.lessons_done}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <svg width={16} height={16}>
                <use href="/symbol-defs.svg#star" />
              </svg>
              <p> Rating:{teacher.rating}</p>
            </div>
            <p>
              Price / 1 hour:{" "}
              <span style={{ color: "#38cd3eff" }}>
                {teacher.price_per_hour}$
              </span>
            </p>
          </div>
          <button>
            <svg width={26} height={26} className={css.heart}>
              <use href="/symbol-defs.svg#heart" />
            </svg>
          </button>
        </div>
        <h2>
          {teacher.name}&nbsp;{teacher.surname}
        </h2>
        <div></div>
        <button></button>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
