import React, { useEffect, useState } from "react";

export default function ActivityLog({ workspaceId }) {
  const [items, setItems] = useState(() => {
    const all = JSON.parse(localStorage.getItem("activity") || "[]");
    return workspaceId ? all.filter(a => a.relatedWorkspace === workspaceId) : all;
  });

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("activity") || "[]");
    setItems(workspaceId ? all.filter(a => a.relatedWorkspace === workspaceId) : all);
  }, [workspaceId]);

  return (
    <div className="bg-white p-3 rounded shadow">
      <h3 className="font-semibold mb-2">Activity</h3>
      <ul className="space-y-2 text-sm">
        {items.map(it => (
          <li key={it.id} className="text-gray-700">
            <div>{it.description}</div>
            <div className="text-xs text-gray-400">{new Date(it.createdAt).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
