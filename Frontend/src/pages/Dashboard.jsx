import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import WorkspaceCard from "../components/WorkSpaceCard";
import KanbanBoard from "../components/KanbanBoard";
import Home from "./Home";
import Workspaces from "./Workspaces";
import Todo from "./Todo";
import Notifications from "./Notifications";
import Profile from "./Profile";


const Dashboard = ()=> {
  const [active, setActive] = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  const sampleWorkspaces = [
    { title: "Design System", description: "UI components and tokens", members: 6, updated: "2d", files: 12 },
    { title: "Landing Page", description: "Marketing site tasks", members: 3, updated: "1d", files: 4 },
    { title: "Backend API", description: "Auth, DB & sockets", members: 5, updated: "3d", files: 8 },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar onMobileToggle={() => setCollapsed(!collapsed)} />

      <div className="flex flex-1">
        <div className={`transition-transform duration-300 ${collapsed ? "-translate-x-80 sm:translate-x-0" : "translate-x-0"}`}>
          <Sidebar
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(prev => !prev)}
            active={active}
            setActive={setActive}
          />
        </div>

        <main className="flex-1 p-6 sm:p-8 overflow-auto">
          {/* Page header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
              {active}
            </h1>
            {/* header actions can go here */}
          </div>

          {/* Page content */}
          <div>
            {active === "home" && (
              <>
                <Home />
                <section className="mt-8">
                  <h2 className="text-lg font-semibold mb-4">Your Workspaces</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sampleWorkspaces.map((ws, i) => <WorkspaceCard key={i} ws={ws} />)}
                  </div>
                </section>
                <section className="mt-8">
                  <h2 className="text-lg font-semibold mb-4">Quick Todo Board</h2>
                  <KanbanBoard />
                </section>
              </>
            )}

            {active === "workspaces" && <Workspaces /> }
            {active === "todo" && <Todo /> }
            {active === "notifications" && <Notifications /> }
            {active === "profile" && <Profile /> }
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;