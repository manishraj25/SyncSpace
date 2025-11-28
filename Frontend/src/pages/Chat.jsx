import React, { useEffect, useState } from "react";
import ChatBox from "../components/ChatBox";

export default function Chat({ workspaceId }) {
  const [messages, setMessages] = useState(() => JSON.parse(localStorage.getItem("messages") || "[]").filter(m => m.workspace === workspaceId));

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("messages") || "[]");
    setMessages(all.filter(m => m.workspace === workspaceId));
  }, [workspaceId]);

  const send = (text) => {
    const all = JSON.parse(localStorage.getItem("messages") || "[]");
    const m = { id: "m"+Date.now(), workspace: workspaceId, sender: "You", content: text, createdAt: new Date().toISOString() };
    all.push(m);
    localStorage.setItem("messages", JSON.stringify(all));
    setMessages(prev => [...prev, m]);
  };

  return <ChatBox messages={messages} onSend={send} />;
}
