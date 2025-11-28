import React, { useEffect, useState } from "react";
import DocumentEditor from "../components/DocumentEditor";

export default function Documents({ workspaceId }) {
  const [docs, setDocs] = useState(() => JSON.parse(localStorage.getItem("docs") || "[]").filter(d => d.workspace === workspaceId));
  const [title, setTitle] = useState("");

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("docs") || "[]");
    setDocs(all.filter(d => d.workspace === workspaceId));
  }, [workspaceId]);

  const createDoc = () => {
    if (!title.trim()) return;
    const all = JSON.parse(localStorage.getItem("docs") || "[]");
    const newDoc = { id: "d" + Date.now(), workspace: workspaceId, title, content: "<p></p>", createdAt: new Date().toISOString() };
    all.push(newDoc);
    localStorage.setItem("docs", JSON.stringify(all));
    setDocs(prev => [...prev, newDoc]);
    setTitle("");
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input value={title} onChange={e => setTitle(e.target.value)} className="border p-2 rounded flex-1" placeholder="New document title" />
        <button onClick={createDoc} className="bg-green-600 text-white px-4 rounded">Create</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <div className="bg-white p-3 rounded shadow">
            <h4 className="font-semibold mb-2">Documents</h4>
            <ul className="space-y-2">
              {docs.map(d => (
                <li key={d.id} className="text-sm">
                  <a href={`#/docs/${workspaceId}/${d.id}`} onClick={(e)=>{ e.preventDefault(); document.location.hash = `/docs/${workspaceId}/${d.id}`}} className="hover:underline">{d.title}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="md:col-span-2">
          {/* Display first doc editor as placeholder */}
          {docs[0] ? <DocumentEditor workspaceId={workspaceId} docId={docs[0].id} /> : <div className="bg-white p-4 rounded shadow">No document selected</div>}
        </div>
      </div>
    </div>
  );
}
