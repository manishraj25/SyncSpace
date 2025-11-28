import React from "react";
import { useAuth } from "../context/AuthContext";
import { User, Mail, Pencil } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();

  // Fallback in case user is null
  const profile = user || {
    name: "Guest User",
    email: "guest@example.com",
    avatar: "",
  };

  return (
    <div className="w-full flex justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-xl w-full border">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Profile</h2>

          <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            <Pencil size={16} /> Edit Profile
          </button>
        </div>

        {/* AVATAR */}
        <div className="flex items-center flex-col mb-6">
          <div className="w-28 h-28 rounded-full bg-green-600 text-white flex items-center justify-center text-4xl font-bold shadow">
            {profile.name?.charAt(0).toUpperCase()}
          </div>

          <h3 className="mt-3 text-xl font-semibold">{profile.name}</h3>
          <p className="text-gray-500">{profile.email}</p>
        </div>

        {/* DETAILS CARD */}
        <div className="space-y-4">

          <div className="flex items-center gap-3 border p-3 rounded-lg bg-gray-50">
            <User className="text-green-600" size={20} />
            <div>
              <p className="text-xs text-gray-500">Full Name</p>
              <p className="font-medium text-gray-800">{profile.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 border p-3 rounded-lg bg-gray-50">
            <Mail className="text-green-600" size={20} />
            <div>
              <p className="text-xs text-gray-500">Email Address</p>
              <p className="font-medium text-gray-800">{profile.email}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
