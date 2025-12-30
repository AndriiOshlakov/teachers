import { Route, Routes } from "react-router-dom";
// import { useState } from "react";

import Home from "./home/Home";
import Teachers from "./teachers/Teachers";
import MainLayout from "./layouts/MainLayout";

function App() {
  // const [isLogin, setIsLogin] = useState(false);
  // const [isRegister, setIsRegister] = useState(false);

  return (
    <Routes>
      {/* Сторінки З Header */}
      <Route
        element={
          <MainLayout
          // onLogin={() => setIsLogin(true)}
          // onRegister={() => setIsRegister(true)}
          />
        }
      >
        <Route path="/" element={<Home />} />
      </Route>

      {/* Сторінки БЕЗ Header */}
      <Route path="/teachers" element={<Teachers />} />
    </Routes>
  );
}

export default App;
