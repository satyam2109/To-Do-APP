import React from "react";
import { Outlet } from "react-router-dom";

import { useTheme } from "../../contexts/ThemeContext";
import Sidebar from "../navigation/Sidebar";
import "../../styles/app-shell.css";

function AppLayout() {
  const { darkMode } = useTheme();

  return (
    <div className={`home-page ${darkMode ? "dark-mode" : ""}`}>
      <Sidebar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
