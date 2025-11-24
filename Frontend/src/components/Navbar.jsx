import React from "react";
import { Link } from "react-router-dom";
import { MenuIcon } from "lucide-react";

const Navbar = ({ onMobileToggle }) => {
  return (
    <nav className="w-full bg-white  px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between sticky top-0 z-50 border-b border-gray-200">
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
    </nav>
  );
}

export default Navbar;
