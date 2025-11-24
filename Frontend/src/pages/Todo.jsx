import React from "react";
import KanbanBoard from "../components/KanbanBoard";

const Todo = () => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Todo / Kanban</h2>
      <div className="bg-white p-4 rounded shadow">
        <KanbanBoard />
      </div>
    </div>
  );
}

export default Todo;