import React from "react";

export default function Settings() {
  const resetAll = () => {
    if (!confirm("Clear all local data? This cannot be undone.")) return;
    const keys = Object.keys(localStorage).filter(k => k.startsWith("syncspace_") || ["workspaces","tasks","columns","projects","files","messages","docs","activity","notifications","users"].includes(k));
    keys.forEach(k => localStorage.removeItem(k));
    alert("Cleared");
    window.location.reload();
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-2xl">
      <h2 className="text-xl font-semibold mb-4">Settings</h2>

      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Data</h3>
          <p className="text-sm text-gray-500">Reset local data used by the demo.</p>
          <button onClick={resetAll} className="mt-2 px-4 py-2 bg-red-500 text-white rounded">Clear Local Data</button>
        </div>

        <div>
          <h3 className="font-medium">Preferences</h3>
          <p className="text-sm text-gray-500">No theme handling per request.</p>
        </div>
      </div>
    </div>
  );
}
