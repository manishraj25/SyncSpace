import React from "react";

export default function AnalyticsPanel() {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold">Project Overview</h3>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="p-3 border rounded">Tasks: <strong>42</strong></div>
        <div className="p-3 border rounded">Completed: <strong>19</strong></div>
        <div className="p-3 border rounded">Active Users: <strong>8</strong></div>
        <div className="p-3 border rounded">Files: <strong>27</strong></div>
      </div>
    </div>
  );
}
