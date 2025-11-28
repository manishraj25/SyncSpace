import React, { useState, useEffect } from "react";
import KanbanBoard from "./KanbanBoard";
import Chat from "./Chat";
import Files from "./Files";
import Documents from "./Documents";
import ActivityLog from "./ActivityLog";

const WorkspaceDetails = ({ workspaceId }) => {
    const [workspaces, setWorkspaces] = useState(
        JSON.parse(localStorage.getItem("workspaces") || "[]")
    );

    const workspace = workspaces.find(ws => ws.id === workspaceId);

    const [tab, setTab] = useState("kanban");

    const saveWorkspace = (updatedWS) => {
        const updated = workspaces.map(ws =>
            ws.id === workspaceId ? updatedWS : ws
        );

        setWorkspaces(updated);
        localStorage.setItem("workspaces", JSON.stringify(updated));
    };

    if (!workspace) return <p>Workspace not found.</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">{workspace.name}</h1>

            {/* Tabs */}
            <div className="flex gap-4 border-b pb-2 mb-4">
                {["kanban", "chat", "files", "documents", "activity"].map(t => (
                    <button
                        key={t}
                        onClick={() => setTab(t)}
                        className={`pb-2 ${tab === t ? "border-b-2 border-blue-500 font-semibold" : ""}`}
                    >
                        {t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                ))}
            </div>

            {/* Dynamic Module Rendering */}
            {tab === "kanban" && (
                <KanbanBoard workspace={workspace} saveWorkspace={saveWorkspace} />
            )}

            {tab === "chat" && (
                <Chat workspace={workspace} saveWorkspace={saveWorkspace} />
            )}

            {tab === "files" && (
                <Files workspace={workspace} saveWorkspace={saveWorkspace} />
            )}

            {tab === "documents" && (
                <Documents workspace={workspace} saveWorkspace={saveWorkspace} />
            )}

            {tab === "activity" && (
                <ActivityLog workspace={workspace} />
            )}
        </div>
    );
};

export default WorkspaceDetails;
