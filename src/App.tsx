import { Route, Routes } from "react-router-dom";

import Home from "./home/Home";
import Teachers from "./teachers/Teachers";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <Routes>
      {/* Сторінки З Header */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Сторінки БЕЗ Header */}
      <Route path="/teachers" element={<Teachers />} />
    </Routes>
  );
}

export default App;
