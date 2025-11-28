import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskDrawer from "../components/TaskDrawer";
import TaskCard from "../components/TaskCard";

export default function KanbanBoard({ workspaceId, projectId }) {
  const [columns, setColumns] = useState(() => {
    const allCols = JSON.parse(localStorage.getItem("columns") || "[]");
    return allCols.filter(c => c.project === projectId);
  });
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem("tasks") || "[]"));
  const [drawerTaskId, setDrawerTaskId] = useState(null);

  useEffect(() => {
    // keep local copy in storage when columns or tasks change
    const allCols = JSON.parse(localStorage.getItem("columns") || "[]");
    // merge/update only project columns
    const others = allCols.filter(c => c.project !== projectId);
    localStorage.setItem("columns", JSON.stringify([...others, ...columns]));
  }, [columns, projectId]);

  useEffect(() => {
    const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const ids = tasks.map(t => t.id);
    const others = allTasks.filter(at => !ids.includes(at.id));
    localStorage.setItem("tasks", JSON.stringify([...others, ...tasks]));
  }, [tasks]);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    setColumns(prev => {
      const next = prev.map(c => ({ ...c }));
      const sCol = next.find(c => c.id === source.droppableId);
      const dCol = next.find(c => c.id === destination.droppableId);
      if (!sCol || !dCol) return prev;
      const [moved] = sCol.tasks.splice(source.index, 1);
      dCol.tasks.splice(destination.index, 0, moved);

      // activity log
      const activity = JSON.parse(localStorage.getItem("activity") || "[]");
      activity.unshift({ id: Date.now(), user: null, action: "TASK_MOVED", description: `Task moved: ${draggableId}`, relatedTask: draggableId, createdAt: new Date().toISOString() });
      localStorage.setItem("activity", JSON.stringify(activity));

      return next;
    });
  };

  const addTask = (colId, title) => {
    const newTask = { id: "t" + Date.now(), title, description: "", project: projectId, column: colId, assignedTo: null, checklist: [], comments: [] };
    setTasks(prev => [...prev, newTask]);
    setColumns(prev => prev.map(c => c.id === colId ? { ...c, tasks: [...c.tasks, newTask.id] } : c));
  };

  return (
    <div className="w-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4 overflow-auto">
          {columns.map(col => (
            <Droppable key={col.id} droppableId={col.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="bg-gray-50 p-3 rounded-md flex-1 min-w-[280px]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{col.title}</h3>
                    <button className="text-sm text-green-600" onClick={() => {
                      const title = prompt("New task title");
                      if (title) addTask(col.id, title);
                    }}>+ Add</button>
                  </div>

                  {col.tasks.map((taskId, idx) => {
                    const t = tasks.find(x => x.id === taskId) || null;
                    if (!t) return null;
                    return (
                      <Draggable key={t.id} draggableId={t.id} index={idx}>
                        {(p) => (
                          <div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps}>
                            <TaskCard task={t} onOpen={() => setDrawerTaskId(t.id)} />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <TaskDrawer taskId={drawerTaskId} onClose={() => setDrawerTaskId(null)} refreshTasks={(nextTasks) => setTasks(nextTasks)} />
    </div>
  );
}
