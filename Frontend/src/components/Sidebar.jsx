import React from "react";
import { Home, Grid, List, Bell, User, ChevronDown, LogOut, Plus } from "lucide-react";


const SidebarButton= ({ icon, label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 p-2 rounded-lg text-left w-full ${
        active ? "bg-green-600 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-800"
      }`}
    >
      <span className="opacity-90">{icon}</span>
      <span className="flex-1">{label}</span>
    </button>
  );
}

const Sidebar = ({ collapsed, onToggleCollapse, active, setActive }) => {
  return (
    <aside
      className={`bg-white dark:bg-gray-900 border-r dark:border-gray-700 w-72 sm:w-64 p-4 flex flex-col space-y-6 transition-all duration-300 ${
        collapsed ? "translate-x-72 sm:translate-x-0" : "translate-x-0"
      }`}
    >
      <div className="relative">
        <button
          onClick={() => setActive("profile")}
          className="w-full flex items-center gap-3 p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">U</div>
          <div className="flex-1 text-left">
            <div className="font-semibold">User Name</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">View profile</div>
          </div>
          <ChevronDown size={16} />
        </button>

        {/* small controls on top-right of sidebar */}
        <div className="absolute top-0 right-0">
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Collapse sidebar"
            title="Collapse"
          >
            <ChevronDown size={14} className={`transform ${collapsed ? "-rotate-90" : ""}`} />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <SidebarButton icon={<Home size={16} />} label="Home" active={active === "home"} onClick={() => setActive("home")} />
        <SidebarButton icon={<Grid size={16} />} label="Workspaces" active={active === "workspaces"} onClick={() => setActive("workspaces")} />
        <SidebarButton icon={<List size={16} />} label="Todo" active={active === "todo"} onClick={() => setActive("todo")} />
        <SidebarButton icon={<Bell size={16} />} label="Notifications" active={active === "notifications"} onClick={() => setActive("notifications")} />
      </div>

      <div className="mt-auto">
        <button className="w-full flex items-center gap-2 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          <Plus size={16} /> New Workspace
        </button>

        <button className="w-full flex items-center gap-2 mt-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition text-red-600">
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;