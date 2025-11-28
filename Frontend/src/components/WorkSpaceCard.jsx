import React from "react";
import { useNavigate } from "react-router-dom";

export default function WorkspaceCard({ ws }) {
  const nav = useNavigate();
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer" onClick={()=>nav(`/workspace/${ws.id}`)}>
      <div className="flex items-center justify-between">
        <div className="font-semibold">{ws.name}</div>
        <small className="text-sm text-gray-500">{(ws.members || []).length} members</small>
      </div>
      <div className="text-sm text-gray-600 mt-2">{ws.description}</div>
    </div>
  );
}
