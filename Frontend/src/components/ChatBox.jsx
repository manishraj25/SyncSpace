import React, { useState } from "react";

export default function ChatBox({ messages, onSend }) {
  const [text, setText] = useState("");
  return (
    <div className="bg-white p-3 rounded shadow">
      <div className="max-h-64 overflow-auto space-y-2 mb-3">
        {messages.map(m => (
          <div key={m.id} className="p-2 border rounded">
            <div className="flex justify-between">
              <div className="font-medium">{m.sender}</div>
              <div className="text-xs text-gray-400">{new Date(m.createdAt).toLocaleTimeString()}</div>
            </div>
            <div className="mt-1 text-sm">{m.content}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input value={text} onChange={e => setText(e.target.value)} className="flex-1 p-2 border rounded" placeholder="Type a message..." />
        <button onClick={() => { if (!text.trim()) return; onSend(text); setText(""); }} className="px-3 py-2 bg-green-600 text-white rounded">Send</button>
      </div>
    </div>
  );
}
