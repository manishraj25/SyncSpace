import React from "react";

const sample = [{id:1, text:"You were mentioned in #design"}, {id:2, text:"Task due tomorrow"}];

export default function NotificationCard(){
  return (
    <div className="bg-white p-3 rounded shadow">
      <h3 className="font-semibold">Notifications</h3>
      <ul className="mt-2 space-y-2">
        {sample.map(n => <li key={n.id} className="text-sm">{n.text}</li>)}
      </ul>
    </div>
  );
}
