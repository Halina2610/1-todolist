import { TaskType } from "api/todolistApi";
import { RequestStatusType } from "state/reducers/appSlice";
import { todolistsActions } from "state/reducers/todosSlice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UpdateDomainTaskModelType } from "state/thunks/tasksThunks";

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TaskStateType,
  reducers: {
    removeTask: (state, action: PayloadAction<{ taskId: string; todolistId: string }>) => {
      const { taskId, todolistId } = action.payload;
      const tasks = state[todolistId];
      const index = tasks.findIndex((task) => task.id === taskId);

      if (index !== -1) {
        tasks.splice(index, 1);
      }
    },
    addTask: (state, action: PayloadAction<{ task: TaskType; todolistId: string }>) => {
      const { task } = action.payload;
      const { todoListId } = task;
      state[todoListId] = [task, ...state[todoListId]];
    },
    updateTask: (
      state,
      action: PayloadAction<{ taskId: string; model: UpdateDomainTaskModelType; todolistId: string }>
    ) => {
   /*   const { taskId, model, todolistId } = action.payload;
      const tasks = state[todolistId];
      const task = tasks.find((t) => t.id === taskId);
      if (task) {
        Object.assign(task, model);
      }*/

      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex(t => t.id === action.payload.taskId)
      if (index > -1) {
        tasks[index] = {...tasks[index], ...action.payload.model}
      }
    },
    setTasks: (state, action: PayloadAction<{ tasks: TaskType[];todolistId: string }>) => {
      const { tasks, todolistId } = action.payload;
      state[todolistId] = tasks;
    },
    changeTaskEntityStatus: (state, action: PayloadAction<{ taskId: string; todolistId: string, entityStatus: RequestStatusType }>) => {
      const { todolistId, taskId, entityStatus } = action.payload;
      state[todolistId] = state[todolistId].map((task) =>
        task.id === taskId ? { ...task, entityStatusTask: entityStatus } : task
      );
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistsActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsActions.removeTodolist, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(todolistsActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach((tl: any) => {
          state[tl.id] = [];
        });
      });
  },
});


export const tasksSlice = slice.reducer
export const taskActions = slice.actions

//types
export type TaskDomainType = TaskType & {
  entityStatusTask: RequestStatusType;
};

export type TaskStateType = {
  [key: string]: TaskDomainType[] | TaskType[];
};
