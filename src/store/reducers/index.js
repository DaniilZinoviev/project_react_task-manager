import { appData } from "../../mock/test-data";

const initialState = appData;

const moveTask = (columns, payload) => {
  const { taskId, from, to } = payload
  const newColumns = { ...columns };

  const fromColumn = newColumns[from.columnId];
  fromColumn.taskIds.splice(from.index, 1);

  const toColumn = newColumns[to.columnId];
  toColumn.taskIds.splice(to.index, 0, taskId);

  return {
    ...newColumns,
  };
};

const reducer = (state, action) => {
  if (!state) {
    return initialState;
  }
  
  switch (action.type) {
    case "MOVE_TASK":
      return {
        ...state,
        columns: moveTask(state.columns, action.payload),
      };

    case "ADD_COLUMN":
      const { column, boardId } = action.payload;
      return {
        ...state,
        columns: { ...state.columns, [column.id]: column },
        boards: {
          ...state.boards,
          [boardId]: {
            ...state.boards[boardId],
            columnIds: [...state.boards[boardId].columnIds, column.id],
          },
        },
      };

    case "ADD_TASK":
      const { task, columnId } = action.payload;
      return {
        ...state,
        tasks: { ...state.tasks, [task.id]: task },
        columns: {
          ...state.columns,
          [columnId]: {
            ...state.columns[columnId],
            taskIds: [...state.columns[columnId].taskIds, task.id],
          },
        },
      };

    default:
      return state;
  }
};

export { reducer };
