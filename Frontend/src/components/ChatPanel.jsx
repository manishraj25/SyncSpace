import React, { useState } from "react";

const sample = [
  { id:1, user:"Manish", text:"Let's refactor auth", replies: [{id:11,user:"Asha",text:"Agree"}], reactions: {thumbs:1} },
];

export default function ChatPanel(){
  const [msgs, setMsgs] = useState(sample);
  const [text, setText] = useState("");
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold">Chat</h3>
      <div className="mt-3 space-y-3 max-h-64 overflow-auto">
        {msgs.map(m => (
          <div key={m.id} className="p-2 border rounded">
            <div className="flex justify-between">
              <div className="font-medium">{m.user}</div>
              <div className="text-xs text-gray-400">2m</div>
            </div>
            <div className="mt-1">{m.text}</div>
            <div className="mt-2 flex gap-2 text-sm">
              <button className="text-gray-500">👍 {m.reactions?.thumbs||0}</button>
              <button className="text-gray-500">Reply ({m.replies?.length||0})</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex gap-2">
        <input value={text} onChange={e=>setText(e.target.value)} className="flex-1 p-2 border rounded" />
        <button onClick={()=>{ if(!text) return; setMsgs(prev=>[...prev,{ id:Date.now(), user:"You", text, replies:[], reactions:{} }]); setText(""); }} className="px-3 py-2 bg-green-600 text-white rounded">Send</button>
      </div>
    </div>
  );
}
