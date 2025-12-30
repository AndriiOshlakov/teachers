import css from "./Teachers.module.css";
import TeacherComponent from "../components/Teacher/Teacher";
import { useEffect, useState } from "react";

import type { Teacher } from "../types/TeacherType";
import { fetchTeachers } from "../services/teachers";

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[] | []>([]);
  const [selectedLevel, setSelectedLevel] = useState<string>("");

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
          <div className={css.levelBox}>
            <label htmlFor="level">Level of knowledge</label>
            <select
              name="level"
              id="level"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
            >
              <option value=""></option>
              <option value="A1 Beginner">A1 Beginner</option>
              <option value="A2 Elementary">A2 Elementary</option>
              <option value="B1 Intermediate">B1 Intermediate</option>
              <option value="B2 Upper-Intermediate">
                B2 Upper-Intermediate
              </option>
              <option value="C1 Advanced">C1 Advanced</option>
              <option value="C2 Proficient">C2 Proficient</option>
            </select>
          </div>
          <div className={css.priceBox}>
            <label htmlFor="price">Price</label>
            <select name="price" id="price">
              <option value=""></option>
              <option value="">25 $</option>
              <option value="">27 $</option>
              <option value="">28 $</option>
              <option value="">30 $</option>
              <option value="">35 $</option>
            </select>
          </div>
        </div>
        <ul className={css.teachersList}>
          {teachers.map((teacher) => (
            <li key={teacher.id}>
              <TeacherComponent
                teacher={teacher}
                selectedLevel={selectedLevel}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
