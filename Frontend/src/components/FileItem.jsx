import React, { useState } from "react";

export default function FileItem({ file }) {
  const [show, setShow] = useState(false);
  return (
    <div className="bg-white p-3 rounded shadow">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">{file.name}</div>
          <div className="text-xs text-gray-400">{file.size ? `${Math.round(file.size/1024)} KB` : ""}</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShow(!show)} className="text-sm text-blue-500">{show ? "Hide" : "Versions"}</button>
        </div>
      </div>

      {show && (
        <div className="mt-2 text-sm">
          {file.versions?.map(v => (
            <div key={v.id} className="flex items-center justify-between py-1">
              <div>{v.name}</div>
              <div className="text-xs text-gray-400">{new Date(v.date).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
