import React from "react";
import { Link } from "react-router-dom";

const HomeNavbar = () => {
    return (
        <nav className="sticky top-0 z-50 w-full bg-white">
            <div className="flex px-4 sm:px-8 justify-between items-center py-3 sm:py-4 text-black">
                <Link to="/">
                    <h1 className="text-lg sm:text-xl font-bold">
                        <span>Sync</span>
                        <span className='text-green-600'>Space</span>
                    </h1>
                </Link>

                <div className="flex  items-center">
                    <Link to="/login" className="hover:font-bold mr-4">Log in</Link>

                    <Link
                        to="/signup"
                        className="hover:font-bold bg-green-600 text-sm hover:bg-green-700 text-white px-3 py-2 rounded-xl font-bold text-center">
                        Sign up
                    </Link>
                </div>

            </div>
        </nav>

    );
}
export default HomeNavbar;