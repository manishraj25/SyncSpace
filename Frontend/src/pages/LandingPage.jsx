import React from "react";
import heroImage from "../assets/hero.jpg";
import { Link } from "react-router-dom";


const LandingPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center w-full">
            <div className="max-w-5xl my-8 bg-white">
                <img
                    src={heroImage}
                    alt="Freelancing workspace"
                    className="w-full h-full"
                />
                <div className="p-8 bg-white">
                    <h1 className="text-4xl font-bold mb-4 text-center">
                        Welcome to Sync<span className="text-green-600">Space</span>
                    </h1>
                    <p className="text-lg mb-6 text-center">
                        Your all-in-one platform to connect, collaborate, and manage your projects with ease.
                    </p>
                    <div className="flex justify-center">
                        <Link
                            to="/signup"
                            className="bg-green-600 text-white px-4 py-2 rounded-lg text-lg font-semibold hover:bg-green-700"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default LandingPage;