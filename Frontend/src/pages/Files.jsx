import React, { useEffect, useState } from "react";
import FileItem from "../components/FileItem";

export default function Files({ workspaceId }) {
  const [files, setFiles] = useState(() => JSON.parse(localStorage.getItem("files") || "[]").filter(f => f.workspace === workspaceId));

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("files") || "[]");
    setFiles(all.filter(f => f.workspace === workspaceId));
  }, [workspaceId]);

  const upload = (e) => {
    const fl = Array.from(e.target.files);
    const all = JSON.parse(localStorage.getItem("files") || "[]");
    const created = fl.map(f => {
      const item = { id: "f" + Date.now() + Math.random().toString(36).slice(2,6), workspace: workspaceId, name: f.name, size: f.size, type: f.type, versions: [{ id: Date.now(), name: f.name, date: new Date().toISOString() }] };
      all.push(item);
      return item;
    });
    localStorage.setItem("files", JSON.stringify(all));
    setFiles(prev => [...prev, ...created]);
    // activity
    const activity = JSON.parse(localStorage.getItem("activity") || "[]");
    activity.unshift({ id: Date.now(), action: "FILE_UPLOADED", description: `Uploaded ${created.length} file(s)`, createdAt: new Date().toISOString(), relatedWorkspace: workspaceId });
    localStorage.setItem("activity", JSON.stringify(activity));
  };

  return (
    <div>
      <div className="mb-4 flex gap-2">
        <input type="file" multiple onChange={upload} />
      </div>

      <div className="grid grid-cols-1 gap-2">
        {files.map(f => <FileItem key={f.id} file={f} />)}
      </div>
    </div>
  );
}
