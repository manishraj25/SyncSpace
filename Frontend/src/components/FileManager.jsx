import React, { useState } from "react";

export default function FileManager(){
  const [files, setFiles] = useState([]);
  const onChange = (e) => setFiles([...files, ...Array.from(e.target.files)]);
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-semibold">Files</h3>
      <div className="mt-3">
        <input type="file" multiple onChange={onChange} />
        <ul className="mt-2 space-y-1">
          {files.map((f,i) => <li key={i} className="text-sm">{f.name}</li>)}
        </ul>
      </div>
    </div>
  );
}
