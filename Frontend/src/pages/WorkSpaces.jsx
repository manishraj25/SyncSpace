import React, { useState, useEffect } from "react";

const Workspaces = () => {
    const [workspaces, setWorkspaces] = useState(
        JSON.parse(localStorage.getItem("workspaces") || "[]")
    );

    const [newWS, setNewWS] = useState("");

    const createWorkspace = () => {
        if (!newWS.trim()) return;

        const newWorkspace = {
            id: Date.now(),
            name: newWS,
            tasks: {
                todo: [],
                inprogress: [],
                completed: []
            },
            files: [],
            messages: [],
            documents: [],
            activity: []
        };

        const updatedList = [...workspaces, newWorkspace];

        setWorkspaces(updatedList);
        localStorage.setItem("workspaces", JSON.stringify(updatedList));
        setNewWS("");
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Workspaces</h1>

            {/* Add new workspace */}
            <div className="flex gap-2 mb-4">
                <input
                    value={newWS}
                    onChange={(e) => setNewWS(e.target.value)}
                    placeholder="New workspace name"
                    className="border p-2 rounded w-full"
                />
                <button
                    onClick={createWorkspace}
                    className="bg-blue-500 text-white px-4 rounded"
                >
                    Add
                </button>
            </div>

            {/* Workspace Cards */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {workspaces.map(ws => (
                    <div key={ws.id} className="bg-white shadow p-4 rounded">
                        <h3 className="font-bold">{ws.name}</h3>
                        <p className="text-gray-500 text-sm mt-1">Tasks: 
                            {ws.tasks.todo.length +
                                ws.tasks.inprogress.length +
                                ws.tasks.completed.length}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Workspaces;
