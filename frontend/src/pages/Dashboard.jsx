import React from "react";
import { useLocation } from "react-router-dom";

import TodoWorkspace from "../components/todos/TodoWorkspace";

function Dashboard() {
  const location = useLocation();

  return (
    <TodoWorkspace
      title="Welcome back! 👋"
      description="Stay organized and get things done."
      showStats
      refreshKey={location.key}
    />
  );
}

export default Dashboard;
