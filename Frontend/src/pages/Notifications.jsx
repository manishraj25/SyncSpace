import React, { useEffect, useState } from "react";

export default function Notifications() {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem("notifications") || "[]"));

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("notifications") || "[]");
    setNotes(all);
  }, []);

  const markRead = (id) => {
    const all = JSON.parse(localStorage.getItem("notifications") || "[]");
    const next = all.map(n => n.id === id ? { ...n, read: true } : n);
    localStorage.setItem("notifications", JSON.stringify(next));
    setNotes(next);
  };

  const clear = () => {
    localStorage.setItem("notifications", JSON.stringify([]));
    setNotes([]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">Notifications</h2>
        <div className="flex gap-2">
          <button onClick={clear} className="text-sm text-red-500">Clear</button>
        </div>
      </div>

      <div className="space-y-2">
        {notes.map(n => (
          <div key={n.id} className={`p-3 rounded border ${n.read ? "bg-gray-50" : "bg-white"}`}>
            <div className="flex justify-between">
              <div>{n.message}</div>
              <div className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleString()}</div>
            </div>
            {!n.read && <button onClick={() => markRead(n.id)} className="mt-2 text-sm text-green-600">Mark read</button>}
          </div>
        ))}
      </div>
    </div>
  );
}
