import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskDrawer from "./TaskDrawer";

const initial = {
  columns: [
    { id: "todo", title: "To Do", tasks: [{ id: "1", title: "Design header" }, { id: "2", title: "Auth flows" }] },
    { id: "in", title: "In Progress", tasks: [{ id: "3", title: "Integrate API" }] },
    { id: "done", title: "Done", tasks: [{ id: "4", title: "Init project" }] },
  ]
};

export default function KanbanBoard(){
  const [state, setState] = useState(initial);
  const [drawerTask, setDrawerTask] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const onDragEnd = result => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    const cols = [...state.columns];
    const sIdx = cols.findIndex(c=>c.id===source.droppableId);
    const dIdx = cols.findIndex(c=>c.id===destination.droppableId);
    const task = cols[sIdx].tasks[source.index];
    cols[sIdx].tasks.splice(source.index,1);
    cols[dIdx].tasks.splice(destination.index,0,task);
    setState({ columns: cols });
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4">
          {state.columns.map(col => (
            <Droppable droppableId={col.id} key={col.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="bg-gray-50 p-3 rounded flex-1 min-h-[150px]">
                  <h3 className="font-semibold mb-2">{col.title}</h3>
                  {col.tasks.map((t, idx) => (
                    <Draggable key={t.id} draggableId={t.id} index={idx}>
                      {(p) => (
                        <div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps}
                          className="bg-white p-3 rounded mb-2 shadow cursor-pointer"
                          onClick={()=>{ setDrawerTask(t); setDrawerOpen(true); }}
                        >
                          {t.title}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <TaskDrawer open={drawerOpen} onClose={()=>setDrawerOpen(false)} task={drawerTask} />
    </div>
  );
}
