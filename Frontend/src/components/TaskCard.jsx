import React from "react";

export default function TaskCard({ task, onOpen }) {
  return (
    <div className="bg-white p-3 rounded mb-2 shadow cursor-pointer hover:shadow-md" onClick={onOpen}>
      <div className="font-medium">{task.title}</div>
      {task.assignedTo && <div className="text-xs text-gray-500 mt-1">Assignee: {task.assignedTo}</div>}
      <div className="text-xs text-gray-400 mt-2">{task.checklist?.filter(i=>i.completed).length || 0}/{task.checklist?.length || 0} done</div>
    </div>
  );
}
