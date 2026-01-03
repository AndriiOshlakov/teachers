import css from "./Teachers.module.css";
import TeacherComponent from "../components/Teacher/Teacher";
import { useCallback, useEffect, useState } from "react";

import type { Teacher } from "../types/TeacherType";
import { fetchTeachers } from "../services/teachers";
import Loader from "../components/Loader/Loader";
import Button from "../components/Button/Button";

type Filters = {
  language: string;
  level: string;
  price: string;
};
const PAGE_SIZE = 4;

export default function Teachers() {
  const [teachers, setTeachers] = useState<Teacher[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    language: "",
    level: "",
    price: "",
  });

  // const loadTeachers = async () => {
  //   if (isLoading || !hasMore) return;

  //   setIsLoading(true);
  //   const newTeachers = await fetchTeachers(lastKey);
  //   if (newTeachers.length < PAGE_SIZE) {
  //     setHasMore(false);
  //   }
  //   if (newTeachers.length > 0) {
  //     setLastKey(newTeachers[newTeachers.length - 1].id);
  //     setTeachers((prev) => [...prev, ...newTeachers]);
  //   }
  //   setIsLoading(false);
  // };

  // const loadTeachers = useCallback(async () => {
  //   if (isLoading || !hasMore) return;

  //   setIsLoading(true);

  //   const newTeachers = await fetchTeachers(lastKey);

  //   if (newTeachers.length < PAGE_SIZE) {
  //     setHasMore(false);
  //   }

  //   if (newTeachers.length > 0) {
  //     setLastKey(newTeachers[newTeachers.length - 1].id);
  //     setTeachers((prev) => {
  //       // Створюємо список ID, які вже є в стейті
  //       const existingIds = new Set(prev.map((t) => t.id));
  //       // Фільтруємо нові дані, залишаючи тільки унікальні
  //       const uniqueNewTeachers = newTeachers.filter(
  //         (t) => !existingIds.has(t.id)
  //       );

  //       return [...prev, ...uniqueNewTeachers];
  //     });
  //   }

  //   setIsLoading(false);
  // }, [isLoading, hasMore, lastKey]);

  const loadTeachers = useCallback(async () => {
    // Використовуємо setIsLoading як прапорець, щоб не завантажувати двічі
    setIsLoading(true);

    try {
      const newTeachers = await fetchTeachers(lastKey);

      if (newTeachers.length < PAGE_SIZE) {
        setHasMore(false);
      }

      if (newTeachers.length > 0) {
        setLastKey(newTeachers[newTeachers.length - 1].id);
        setTeachers((prev) => {
          const existingIds = new Set(prev.map((t) => t.id));
          const uniqueNewTeachers = newTeachers.filter(
            (t) => !existingIds.has(t.id)
          );
          return [...prev, ...uniqueNewTeachers];
        });
      }
    } catch (error) {
      console.error("Error loading teachers:", error);
    } finally {
      setIsLoading(false);
    }
  }, [lastKey]); // Тільки lastKey провокує створення нової функції

  // 2. Виправляємо useEffect
  useEffect(() => {
    // Завантажуємо дані лише якщо список порожній
    if (teachers.length === 0 && !isLoading) {
      loadTeachers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadTeachers]); // Тепер додаємо loadTeachers сюди

  const applyFilters = (list: Teacher[]) => {
    return list.filter((t) => {
      if (filters.language && !t.languages.includes(filters.language)) {
        return false;
      }
      if (filters.price && !(t.price_per_hour === Number(filters.price))) {
        return false;
      }
      if (filters.level && !t.levels.includes(filters.level)) {
        return false;
      }
      return true;
    });
  };

  const filteredTeachers = applyFilters(teachers);

  // useEffect(() => {
  //   loadTeachers();
  // }, []);

  // useEffect(() => {
  //   if (isLoading || !hasMore) return;
  //   if (filteredTeachers.length === 0 && teachers.length > 0) {
  //     loadTeachers();
  //   }
  // }, [teachers, filters]);

  // if (isLoading) {
  //   return <Loader />;
  // }

  return (
    <section className={css.teachers}>
      {isLoading && <Loader />}
      <div className={css.teachersContainer}>
        <div className={css.filtersBox}>
          <div className={css.languagesBox}>
            <label htmlFor="languages">Languages</label>
            <select
              name="languages"
              id="languages"
              value={filters.language}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, language: e.target.value }))
              }
            >
              <option value=""></option>
              <option value="English">English</option>
              <option value="German">German</option>
              <option value="Spain">Spain</option>
              <option value="Italian">Italian</option>
              <option value="French">French</option>
              <option value="Korean">Korean</option>
              <option value="Mandarin Chinese">Mandarin Chinese</option>
              <option value="Vietnamese">Vietnamese</option>
            </select>
          </div>
          <div className={css.levelBox}>
            <label htmlFor="level">Level of knowledge</label>
            <select
              name="level"
              id="level"
              value={filters.level}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, level: e.target.value }))
              }
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
            <select
              name="price"
              id="price"
              value={filters.price}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
            >
              <option value=""></option>
              <option value="25">25 $</option>
              <option value="27">27 $</option>
              <option value="28">28 $</option>
              <option value="30">30 $</option>
              <option value="35">35 $</option>
            </select>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <ul className={css.teachersList}>
            {filteredTeachers.map((teacher) => (
              <li key={teacher.id}>
                <TeacherComponent
                  teacher={teacher}
                  selectedLevel={filters.level}
                />
              </li>
            ))}
          </ul>
          {hasMore && !isLoading && (
            <div style={{ width: "188px", alignSelf: "center" }}>
              <Button text="Load more" onClick={loadTeachers} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
