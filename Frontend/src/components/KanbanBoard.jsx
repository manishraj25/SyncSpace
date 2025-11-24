import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initial = {
  columns: [
    { id: "todo", title: "To Do", tasks: [{ id: "t1", title: "Design homepage" }, { id: "t2", title: "Setup auth" }] },
    { id: "inprogress", title: "In Progress", tasks: [{ id: "t3", title: "Build sidebar" }] },
    { id: "done", title: "Done", tasks: [{ id: "t4", title: "Init repo" }] },
  ],
};

const KanbanBoard = () => {
  const [state, setState] = useState(initial);

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const sourceColIndex = state.columns.findIndex(c => c.id === source.droppableId);
    const destColIndex = state.columns.findIndex(c => c.id === destination.droppableId);
    const sourceCol = state.columns[sourceColIndex];
    const destCol = state.columns[destColIndex];

    const moving = [...sourceCol.tasks];
    const [movedTask] = moving.splice(source.index, 1);

    if (sourceCol === destCol) {
      moving.splice(destination.index, 0, movedTask);
      const newColumns = [...state.columns];
      newColumns[sourceColIndex] = { ...sourceCol, tasks: moving };
      setState({ columns: newColumns });
    } else {
      const destTasks = [...destCol.tasks];
      destTasks.splice(destination.index, 0, movedTask);
      const newColumns = [...state.columns];
      newColumns[sourceColIndex] = { ...sourceCol, tasks: [...sourceCol.tasks.filter(t => t.id !== movedTask.id)] };
      newColumns[destColIndex] = { ...destCol, tasks: destTasks };
      setState({ columns: newColumns });
    }
  };

  return (
    <div className="w-full">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-4">
          {state.columns.map((col) => (
            <Droppable droppableId={col.id} key={col.id}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="bg-gray-50 p-3 rounded-md flex-1 min-h-[200px]">
                  <h3 className="font-semibold mb-2">{col.title}</h3>
                  {col.tasks.map((task, idx) => (
                    <Draggable draggableId={task.id} index={idx} key={task.id}>
                      {(p) => (
                        <div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps}
                          className="bg-white p-3 rounded-md mb-3 shadow-sm hover:shadow-md transition"
                        >
                          {task.title}
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
    </div>
  );
}

export default KanbanBoard;