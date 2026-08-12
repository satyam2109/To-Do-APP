import React from "react";
import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  CheckCircle2,
  BarChart3,
  Settings,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", path: "/home", Icon: LayoutDashboard },
  { key: "myTodos", label: "My Todos", path: "/my-todos", Icon: CheckSquare },
  { key: "calendar", label: "Calendar", path: "/calendar", Icon: CalendarDays },
  { key: "completed", label: "Completed", path: null, Icon: CheckCircle2 },
  { key: "statistics", label: "Statistics", path: null, Icon: BarChart3 },
  { key: "settings", label: "Settings", path: null, Icon: Settings },
];

function getActiveItem(pathname) {
  if (pathname === "/home") return "dashboard";
  if (pathname === "/my-todos") return "myTodos";
  if (pathname === "/calendar") return "calendar";
  return "";
}

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeItem = getActiveItem(location.pathname);

  const handleBrandClick = () => {
    navigate("/home", {
      state: {
        refresh: Date.now(),
      },
    });
  };

  return (
    <aside className="sidebar">
      <button
        type="button"
        className="brand"
        onClick={handleBrandClick}
        aria-label="Go to Dashboard"
      >
        <div className="brand-logo">
          <img src="/Logo.png" alt="To Do App Logo" />
        </div>

        <span className="brand-title">
          To Do <span>App</span>
        </span>
      </button>

      <nav className="sidebar-navigation">
        {NAV_ITEMS.map(({ key, label, path, Icon }) => (
          <button
            key={key}
            type="button"
            className={`navigation-item ${
              activeItem === key ? "active" : ""
            }`}
            onClick={() => path && navigate(path)}
            disabled={!path}
            title={!path ? `${label} is not available yet` : label}
          >
            <Icon size={20} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
