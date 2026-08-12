import React from "react";
import { Route, Routes } from "react-router-dom";

import { ThemeProvider } from "./contexts/ThemeContext";
import AppLayout from "./components/layout/AppLayout";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import MyTodos from "./pages/MyTodos";
import Calendar from "./pages/Calendar";

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route element={<AppLayout />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/my-todos" element={<MyTodos />} />
          <Route path="/calendar" element={<Calendar />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
