import React from "react";

export default function WorkspaceCard({ ws }){
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">{ws.title}</h4>
        <small className="text-sm text-gray-500">{ws.members} members</small>
      </div>
      <p className="text-sm text-gray-600 mt-2">{ws.description}</p>
    </div>
  );
}
