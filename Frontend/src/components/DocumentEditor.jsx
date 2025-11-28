import React, { useEffect, useRef, useState } from "react";

export default function DocumentEditor({ workspaceId, docId }) {
  const [doc, setDoc] = useState(() => {
    const all = JSON.parse(localStorage.getItem("docs") || "[]");
    return all.find(d => d.id === docId) || null;
  });
  const ref = useRef();

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("docs") || "[]");
    setDoc(all.find(d => d.id === docId) || null);
  }, [docId]);

  useEffect(() => {
    if (!docId) return;
    const handler = () => {
      const all = JSON.parse(localStorage.getItem("docs") || "[]");
      const current = all.find(d => d.id === docId);
      setDoc(current);
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [docId]);

  if (!doc) return <div className="bg-white p-4 rounded shadow">No document</div>;

  const onInput = () => {
    const html = ref.current.innerHTML;
    const all = JSON.parse(localStorage.getItem("docs") || "[]");
    const idx = all.findIndex(d => d.id === docId);
    if (idx !== -1) {
      all[idx] = { ...all[idx], content: html, updatedAt: new Date().toISOString() };
      localStorage.setItem("docs", JSON.stringify(all));
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold mb-2">{doc.title}</h3>
      <div contentEditable ref={ref} onInput={onInput} className="min-h-[300px] p-3 border rounded" dangerouslySetInnerHTML={{ __html: doc.content }} />
    </div>
  );
}
