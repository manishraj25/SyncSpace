import React from "react";
import { Users, Clock, FileText } from "lucide-react";

const WorkspaceCard = ({ ws }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">{ws.title}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">{ws.members} members</div>
      </div>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{ws.description}</p>

      <div className="mt-4 flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-1"><Users size={14} /> {ws.members}</div>
        <div className="flex items-center gap-1"><Clock size={14} /> {ws.updated}</div>
        <div className="flex items-center gap-1"><FileText size={14} /> {ws.files}</div>
      </div>
    </div>
  );
}

export default WorkspaceCard;