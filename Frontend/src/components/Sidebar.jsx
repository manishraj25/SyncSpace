import React, { useState } from "react";
import { Home, Grid, List, Bell, User, ChevronDown, Plus, LogOut, Folder } from "lucide-react";
import { useAuth } from "../context/AuthContext";  // ⬅ fetch user + logout

const SidebarButton = ({ icon, label, active, onClick }) => {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 p-2 rounded-lg text-left w-full ${
                active ? "bg-green-600 text-white" : "hover:bg-gray-100"
            }`}
        >
            <span className="opacity-90">{icon}</span>
            <span className="flex-1">{label}</span>
        </button>
    );
};

const Sidebar = ({ collapsed, active, setActive }) => {
    const [profileMenu, setProfileMenu] = useState(false);
    const [workspaceOpen, setWorkspaceOpen] = useState(false);

    const { user, logout } = useAuth(); // ⬅ fetch user + logout

    const workspaces = ["Design System", "Landing Page", "Backend API"];

    return (
        <aside
            className={`
                bg-white w-64 p-4 flex flex-col transition-transform duration-300
                ${collapsed ? "-translate-x-64" : "translate-x-0"}
                sm:translate-x-0
            `}
        >
            {/* PROFILE SECTION */}
            <div className="relative mb-4">
                <button
                    onClick={() => setProfileMenu(!profileMenu)}
                    className="w-full flex items-center justify-between gap-3 p-2 px-3 rounded-lg bg-gray-100 
                        hover:bg-gray-200"
                >
                    <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                        {user?.name?.[0] || "U"}
                    </div>

                    <div className="text-left font-semibold truncate">
                        {user?.name || "User Name"}
                    </div>

                    <ChevronDown size={16} className={`${profileMenu ? "rotate-180" : ""} transition`} />
                </button>

                {profileMenu && (
                    <div className="mt-2 p-2 rounded-lg bg-gray-100 shadow-md text-sm space-y-2 fade-in">
                        <button
                            className="w-full p-2 rounded hover:bg-gray-200 text-left flex items-center gap-2"
                            onClick={() => {
                                setActive("profile");
                                setProfileMenu(false);
                            }}
                        >
                            <User size={16} /> View Profile
                        </button>

                        <button
                            className="w-full p-2 rounded hover:bg-gray-200 text-left flex items-center gap-2"
                        >
                            <Plus size={16} /> Create Workspace
                        </button>

                        <button
                            onClick={logout}
                            className="w-full p-2 rounded hover:bg-gray-200 text-left text-red-600 flex items-center gap-2"
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                )}
            </div>

            {/* HOME BUTTON */}
            <SidebarButton
                icon={<Home size={16} />}
                label="Home"
                active={active === "home"}
                onClick={() => setActive("home")}
            />

            {/* WORKSPACES SECTION */}
            <div>
                <div
                    className={`flex items-center justify-between p-2 rounded-lg w-full
                        ${active === "workspaces"
                            ? "bg-green-600 text-white"
                            : "hover:bg-gray-100"
                        }`}
                >
                    <button
                        onClick={() => {
                            setWorkspaceOpen(!workspaceOpen);
                            setActive("workspaces");
                        }}
                        className="flex items-center gap-2 w-full text-left"
                    >
                        <Grid size={16} />
                        <span className="flex-1">Workspaces</span>
                    </button>

                    <button>
                        <Plus size={16} className="opacity-80 hover:opacity-100 cursor-pointer" />
                    </button>
                </div>

                {workspaceOpen && (
                    <div className="ml-6 mt-2 space-y-2">
                        {workspaces.map((ws, i) => (
                            <button
                                key={i}
                                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 
                                    w-full text-left text-sm"
                            >
                                <Folder size={14} /> {ws}
                            </button>
                        ))}

                        <button className="flex items-center gap-2 p-2 rounded hover:bg-gray-100  text-sm text-green-600">
                            <Plus size={14} /> New Workspace
                        </button>
                    </div>
                )}
            </div>

            {/* TODO */}
            <SidebarButton
                icon={<List size={16} />}
                label="Todo"
                active={active === "todo"}
                onClick={() => setActive("todo")}
            />

            {/* NOTIFICATIONS */}
            <SidebarButton
                icon={<Bell size={16} />}
                label="Notifications"
                active={active === "notifications"}
                onClick={() => setActive("notifications")}
            />
        </aside>
    );
};

export default Sidebar;
