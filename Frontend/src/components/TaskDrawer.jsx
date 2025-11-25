import React, { useState } from "react";

export default function TaskDrawer({ open, onClose, task }) {
  const [comments, setComments] = useState(task?.comments ?? []);
  const [text, setText] = useState("");
  if (!open) return null;
  return (
    <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-lg z-50 p-4 overflow-auto">
      <button onClick={onClose} className="mb-3">Close</button>
      <h2 className="text-xl font-semibold">{task?.title || "Task"}</h2>
      <p className="text-sm text-gray-700 mt-2">{task?.description}</p>

      <div className="mt-4">
        <h4 className="font-medium">Comments</h4>
        <div className="mt-2 space-y-2">
          {comments.map((c,i) => <div key={i} className="text-sm p-2 bg-gray-50 rounded">{c}</div>)}
        </div>
        <div className="mt-2 flex gap-2">
          <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 p-2 border rounded" />
          <button onClick={()=>{ setComments(prev=>[...prev,text]); setText(""); }} className="px-3 py-2 bg-green-600 text-white rounded">Comment</button>
        </div>
      </div>
    </div>
  );
}
