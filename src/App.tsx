import { Route, Routes } from "react-router-dom";

import Home from "./home/Home";
import Teachers from "./teachers/Teachers";
import MainLayout from "./layouts/MainLayout";
import FavouriteTeachers from "./favouriteTeachers/favouriteTeachers";

function App() {
  return (
    <Routes>
      {/* Сторінки З Header */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/teachers" element={<Teachers />} />
        <Route path="/favouriteTeachers" element={<FavouriteTeachers />} />
      </Route>
    </Routes>
  );
}

export default App;
