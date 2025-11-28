import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import WorkspaceCard from "../components/WorkSpaceCard";
import KanbanBoard from "../components/KanbanBoard";
import AnalyticsPanel from "../components/AnalyticsPanel";
import Workspaces from "./Workspaces";
import Profile from "./Profile";
import Notifications from "./Notifications";

const Dashboard = () => {
    const [active, setActive] = useState("home");
    const [collapsed, setCollapsed] = useState(true); // mobile: hidden by default

    const sampleWorkspaces = [
        { title: "Design System", description: "UI components and tokens", members: 6 },
        { title: "Landing Page", description: "Marketing site tasks", members: 3 },
        { title: "Backend API", description: "Auth, DB & sockets", members: 5 },
    ];

    return (
        <div className=" flex flex-col bg-gray-50">

            {/* NAVBAR */}
            <Navbar onMobileToggle={() => setCollapsed(!collapsed)} />

            <div className="flex flex-1">

                <div
                    className={`fixed z-30 left-0 top-15 inset-y-0 w-64 bg-white shadow-lg
                                transform transition-transform duration-300
                                ${collapsed ? "-translate-x-64" : "translate-x-0"}
                                sm:translate-x-0`}>
                    <Sidebar
                        collapsed={collapsed}
                        onToggleCollapse={() => setCollapsed(prev => !prev)}
                        active={active}
                        setActive={setActive}
                    />
                </div>




                {/* MAIN CONTENT */}
                <main className="flex-1 p-6 sm:p-8 overflow-auto sm:ml-64">
                    <div>
                        {active === "home" && (
                            <>
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    <div className="lg:col-span-2 space-y-4">
                                        <AnalyticsPanel />
                                        <div className="mt-8">
                                            <h2 className="text-lg font-semibold mb-4">Your Workspaces</h2>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                                {sampleWorkspaces.map((ws, i) => (
                                                    <WorkspaceCard key={i} ws={ws} />
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-4 bg-white p-4 rounded shadow">
                                            <h3 className="font-semibold mb-3">Kanban</h3>
                                            <KanbanBoard />
                                        </div>

                                    </div>
                                </div>
                            </>
                        )}

                        {active === "workspaces" && <Workspaces />}
                        {active === "profile" && <Profile />}
                        {active === "notifications" && <Notifications />}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
