import React, { useState } from "react";
import { FiHome, FiBell, FiList, FiGrid, FiUser, FiChevronDown, FiMenu } from "react-icons/fi";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState("home");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* -------------------- NAVBAR -------------------- */}
      <nav className="w-full bg-white shadow-md flex items-center justify-between px-4 py-3">

        {/* Sidebar Toggle (only mobile) */}
        <button
          className="sm:hidden text-2xl"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FiMenu />
        </button>

        {/* Logo Center on Mobile, Left on Desktop */}
        <div className="text-xl font-bold mx-auto sm:mx-0">SyncSpace</div>

        {/* Empty div to balance layout */}
        <div className="w-6 sm:w-0"></div>
      </nav>

      {/* -------------------- MAIN AREA -------------------- */}
      <div className="flex flex-1">

        {/* -------------------- SIDEBAR -------------------- */}
        <aside
          className={`bg-white shadow-lg w-64 flex flex-col p-4 transition-all duration-300 z-20
            ${sidebarOpen ? "translate-x-0" : "-translate-x-64"} 
            fixed sm:static h-full`}
        >

          {/* ---- Profile Section ---- */}
          <div className="mb-6">
            <button
              className="flex items-center justify-between w-full p-2 bg-gray-100 rounded-lg"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            >
              <span className="flex items-center gap-2">
                <FiUser className="text-lg" />
                Profile
              </span>
              <FiChevronDown />
            </button>

            {/* Profile Dropdown */}
            {profileMenuOpen && (
              <div className="mt-2 bg-gray-50 rounded-lg p-2 space-y-2">
                <button
                  className="w-full text-left hover:bg-gray-200 p-2 rounded"
                  onClick={() => setActivePage("profile")}
                >
                  Profile
                </button>
                <button className="w-full text-left hover:bg-gray-200 p-2 rounded">
                  Create Workspace
                </button>
                <button className="w-full text-left hover:bg-gray-200 p-2 rounded text-red-500">
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* ---- Sidebar Menu ---- */}
          <div className="space-y-3">
            <button
              className={`flex items-center gap-3 p-2 rounded-lg w-full text-left ${
                activePage === "home" ? "bg-gray-200" : ""
              }`}
              onClick={() => setActivePage("home")}
            >
              <FiHome /> Home
            </button>

            <button
              className={`flex items-center gap-3 p-2 rounded-lg w-full text-left ${
                activePage === "workspaces" ? "bg-gray-200" : ""
              }`}
              onClick={() => setActivePage("workspaces")}
            >
              <FiGrid /> Workspaces
            </button>

            <button
              className={`flex items-center gap-3 p-2 rounded-lg w-full text-left ${
                activePage === "todo" ? "bg-gray-200" : ""
              }`}
              onClick={() => setActivePage("todo")}
            >
              <FiList /> Todo
            </button>

            <button
              className={`flex items-center gap-3 p-2 rounded-lg w-full text-left ${
                activePage === "notifications" ? "bg-gray-200" : ""
              }`}
              onClick={() => setActivePage("notifications")}
            >
              <FiBell /> Notifications
            </button>
          </div>
        </aside>

        {/* -------------------- RIGHT CONTENT AREA -------------------- */}
        <main className="flex-1 p-6 mt-14 sm:mt-0">

          {/* HOME PAGE */}
          {activePage === "home" && (
            <div>
              <h1 className="text-3xl font-bold mb-4">Home</h1>
              <p>Welcome to your dashboard.</p>
            </div>
          )}

          {/* PROFILE PAGE */}
          {activePage === "profile" && (
            <div>
              <h1 className="text-3xl font-bold mb-4">Profile</h1>
              <p>Your profile settings will appear here.</p>
            </div>
          )}

          {/* WORKSPACES PAGE */}
          {activePage === "workspaces" && (
            <div>
              <h1 className="text-3xl font-bold mb-4">Workspaces</h1>
              <p>Your workspace list appears here.</p>
            </div>
          )}

          {/* TODO PAGE */}
          {activePage === "todo" && (
            <div>
              <h1 className="text-3xl font-bold mb-4">Todo</h1>
              <p>Your tasks will be shown here.</p>
            </div>
          )}

          {/* NOTIFICATIONS PAGE */}
          {activePage === "notifications" && (
            <div>
              <h1 className="text-3xl font-bold mb-4">Notifications</h1>
              <p>Your alerts appear here.</p>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};

export default Dashboard;
