import css from "./favouriteTeachers.module.css";
import { useEffect, useState } from "react";
import type { Teacher } from "../types/TeacherType";
import { getAllTeachers } from "../services/teachers";
import {
  getFavorites,
  removeFromFavorites,
} from "../services/favoriteTeachers";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import Loader from "../components/Loader/Loader";
import TeacherComponent from "../components/Teacher/Teacher";
import { Link } from "react-router-dom";

export default function FavouriteTeachers() {
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [teachers, setTeachers] = useState<Teacher[] | []>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setFavoriteIds(new Set());
        return;
      }
      const ids = await getFavorites(user.uid);
      setFavoriteIds(new Set(ids));
    });
    return () => unsub();
  }, []);

  const deleteFromFavTeachers = async (teacherId: string) => {
    const user = auth.currentUser;
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      next.delete(teacherId);
      return next;
    });
    await removeFromFavorites(user!.uid, teacherId);
  };

  useEffect(() => {
    const loadFavoriteTeachers = async () => {
      setIsLoading(true);

      try {
        const allTeachers = await getAllTeachers();

        const favoriteTeachers = allTeachers.filter((teacher) =>
          favoriteIds.has(teacher.id)
        );
        setTeachers(favoriteTeachers);
      } finally {
        setIsLoading(false);
      }
    };

    if (favoriteIds.size > 0) {
      loadFavoriteTeachers();
    } else {
      setTeachers([]);
    }
  }, [favoriteIds]);

  return (
    <div className={css.favouritesContainer}>
      {isLoading && <Loader />}
      {!isLoading && teachers.length === 0 && (
        <div className={css.noList}>
          <p>Ви ще не обрали вчителів.Будь ласка зробіть свій вибір.</p>
          <Link to="/teachers" className={css.link}>
            Teachers list
          </Link>
        </div>
      )}
      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            <TeacherComponent
              teacher={teacher}
              onToggleFavorite={() => deleteFromFavTeachers(teacher.id)}
              isFavorite={true}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
