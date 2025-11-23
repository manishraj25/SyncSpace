import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { MenuIcon } from "lucide-react";

const Navbar = ({ onMobileToggle }) => {
  return (
    <nav className="w-full bg-white dark:bg-gray-800 border-b dark:border-gray-700 px-4 sm:px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* mobile toggle button */}
        <button
          className="sm:hidden text-2xl p-1"
          onClick={onMobileToggle}
          aria-label="Toggle sidebar"
        >
            <MenuIcon />
        </button>

        <Link to="/dashboard" className="text-lg sm:text-xl font-bold">
          <span className="text-current">Sync</span>
          <span className="text-green-600 dark:text-green-400">Space</span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
