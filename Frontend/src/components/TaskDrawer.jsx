import React, { useEffect, useState } from "react";

export default function TaskDrawer({ taskId, onClose, refreshTasks }) {
  if (!taskId) return null;
  const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  const task = allTasks.find(t => t.id === taskId);
  const [title, setTitle] = useState(task?.title || "");
  const [desc, setDesc] = useState(task?.description || "");
  const [comments, setComments] = useState(task?.comments || []);
  const [checklist, setChecklist] = useState(task?.checklist || []);
  const [newComment, setNewComment] = useState("");
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    setTitle(task?.title || "");
    setDesc(task?.description || "");
    setComments(task?.comments || []);
    setChecklist(task?.checklist || []);
  }, [taskId]);

  if (!task) return null;

  const save = () => {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const idx = tasks.findIndex(t => t.id === taskId);
    if (idx === -1) return;
    tasks[idx] = { ...tasks[idx], title, description: desc, comments, checklist, updatedAt: new Date().toISOString() };
    localStorage.setItem("tasks", JSON.stringify(tasks));
    refreshTasks && refreshTasks(tasks);
  };

  const addComment = () => {
    if (!newComment.trim()) return;
    const c = { id: Date.now(), text: newComment, createdAt: new Date().toISOString(), user: "You" };
    const next = [...comments, c];
    setComments(next);
    setNewComment("");
  };

  const addChecklist = () => {
    if (!newItem.trim()) return;
    const item = { id: Date.now(), title: newItem, completed: false };
    setChecklist(prev => [...prev, item]);
    setNewItem("");
  };

  const toggleItem = (id) => {
    setChecklist(prev => prev.map(i => i.id === id ? { ...i, completed: !i.completed } : i));
  };

  const deleteComment = (id) => setComments(prev => prev.filter(c => c.id !== id));

  return (
    <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-lg z-50 p-4 overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold">Task</h2>
          <div className="text-sm text-gray-500">{taskId}</div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => { save(); onClose(); }} className="px-3 py-1 bg-green-600 text-white rounded">Save</button>
          <button onClick={onClose} className="px-3 py-1 border rounded">Close</button>
        </div>
      </div>

      <div>
        <input className="w-full p-2 border rounded mb-3" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="w-full p-2 border rounded mb-3" rows={4} value={desc} onChange={e => setDesc(e.target.value)} />
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Checklist</h4>
        <div className="space-y-2">
          {checklist.map(item => (
            <div key={item.id} className="flex items-center gap-2">
              <input type="checkbox" checked={item.completed} onChange={() => toggleItem(item.id)} />
              <div className={`flex-1 ${item.completed ? "line-through text-gray-500" : ""}`}>{item.title}</div>
            </div>
          ))}
          <div className="flex gap-2 mt-2">
            <input value={newItem} onChange={e => setNewItem(e.target.value)} className="flex-1 p-2 border rounded" placeholder="New checklist item" />
            <button onClick={addChecklist} className="px-3 py-1 bg-green-600 text-white rounded">Add</button>
          </div>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Comments</h4>
        <div className="space-y-2">
          {comments.map(c => (
            <div key={c.id} className="p-2 bg-gray-50 rounded">
              <div className="text-sm">{c.text}</div>
              <div className="text-xs text-gray-400 mt-1 flex justify-between">
                <div>{c.user}</div>
                <div>
                  <button onClick={() => deleteComment(c.id)} className="text-red-500 text-xs">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mt-3">
          <input value={newComment} onChange={e => setNewComment(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Write a comment" />
          <button onClick={addComment} className="px-3 py-1 bg-green-600 text-white rounded">Comment</button>
        </div>
      </div>
    </div>
  );
}
