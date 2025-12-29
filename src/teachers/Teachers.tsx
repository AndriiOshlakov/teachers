import css from "./Teachers.module.css";
import TeacherComponent from "../components/Teacher/Teacher";
import { useEffect, useState } from "react";
import { fetchTeachers } from "../services/services";
import type { Teacher } from "../types/TeacherType";

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[] | []>([]);
  useEffect(() => {
    async function loadTeachers() {
      const teachersArray = await fetchTeachers();
      console.log(teachersArray);
      setTeachers(teachersArray as Teacher[]);
    }

    loadTeachers();
  }, []);

  return (
    <section className={css.teachers}>
      <div className={css.teachersContainer}>
        <div className={css.filtersBox}>
          <div className={css.languagesBox}>
            <label htmlFor="languages">Languages</label>
            <select name="languages" id="languages">
              <option value=""></option>
              <option value="">English</option>
              <option value="">German</option>
              <option value="">Spain</option>
              <option value="">Italian</option>
              <option value="">French</option>
              <option value="">Korean</option>
              <option value="">Mandarin Chinese</option>
              <option value="">Vietnamese</option>
            </select>
          </div>

          <select name="" id="">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>
          <select name="" id="">
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>
        </div>
        <ul>
          {teachers.map((teacher) => (
            <li key={teacher.id}>
              <TeacherComponent teacher={teacher} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
