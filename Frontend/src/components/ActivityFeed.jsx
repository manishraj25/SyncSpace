import React from "react";

const sample = [
  { id:1, text: "Manish created task Improve login", time: "2m ago" },
  { id:2, text: "Asha commented on UI mock", time: "1h ago" },
];

export default function ActivityFeed(){
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold">Activity</h3>
      <ul className="mt-3 space-y-2">
        {sample.map(s => (
          <li key={s.id} className="text-sm text-gray-700">{s.text} <span className="text-xs text-gray-400">• {s.time}</span></li>
        ))}
      </ul>
    </div>
  );
}
