import { TaskType, todolistApi, UpdateTaskType } from "api/todolistApi";
import { appActions, RequestStatusType } from "app/app-reducer";
import { todosActions} from "featchers/todolists/todos-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "utils/thunk_utils";
import { handleServerNetworkError } from "utils/handle-server-network-error";
import { handleServerAppError } from "utils/handle-server-app-error";
import { ResultCode, TaskPriorities, TaskStatuses } from "enums";

const slice = createSlice({
  name: "tasks",
  initialState: {} as TaskStateType,
  reducers: {
    changeTaskEntityStatus: (state, action: PayloadAction<{ taskId: string; todolistId: string, entityStatus: RequestStatusType }>) => {
      const { todolistId, taskId, entityStatus } = action.payload;
      state[todolistId] = state[todolistId].map((task) =>
        task.id === taskId ? { ...task, entityStatusTask: entityStatus } : task
      );
    },
    clearTaskData: () => {
      return {};
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        const { tasks, todolistId } = action.payload;
        state[todolistId] = tasks;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const { id, todolistId } = action.payload;
        const tasks = state[todolistId];
        const index = tasks.findIndex((task) => task.id === id);

        if (index !== -1) {
          tasks.splice(index, 1);
        }
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const { task } = action.payload;
        const { todoListId } = task;
        state[todoListId] = [task, ...state[todoListId]];
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId];
        const index = tasks.findIndex(t => t.id === action.payload.taskId);
        if (index > -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel };
        }
      })

      .addCase(todosActions.addTodos.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todosActions.removeTodos.fulfilled, (state, action) => {
        delete state[action.payload.id];
      })
      .addCase(todosActions.fetchTodos.fulfilled, (state, action) => {
        action.payload.todos.forEach((tl) => {
          state[tl.id] = [];
        });
      })
  }
});

//thunks
const fetchTasks = createAppAsyncThunk<{ tasks: TaskType[], todolistId: string }, string>
(`${slice.name}/fetchTasks`, async (todolistId, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: "loading" }));

  try {
    const res = await todolistApi.getTasks(todolistId);
    if (res.data.error !== null) {
      dispatch(appActions.setAppError({ error: res.data.error }));
      console.error(res.data.totalCount);
    }
    dispatch(appActions.setAppStatus({ status: "succeeded" }));
    return { tasks: res.data.items, todolistId };

  } catch (error) {
    handleServerNetworkError(error, dispatch);
    return rejectWithValue(null);
  }
});

const removeTask = createAppAsyncThunk<{ id: string, todolistId: string }, { id: string, todolistId: string }>(
  `${slice.name}/removeTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      const res = await todolistApi.removeTask(arg.id, arg.todolistId);
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return arg;
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  }
);


const addTask = createAppAsyncThunk<{ task: TaskType }, { title: string, todolistId: string }>(
  `${slice.name}/addTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
      const res = await todolistApi.addTask(arg.title, arg.todolistId);
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        return { task: res.data.data.item, todolistId: res.data.data.item.todoListId };
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  }
);

const updateTask = createAppAsyncThunk<{
  taskId: string;
  domainModel: UpdateDomainTaskModelType;
  todolistId: string;
}, {
  taskId: string;
  domainModel: UpdateDomainTaskModelType;
  todolistId: string;
}>(
  `${slice.name}/updateTask`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI;

    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      dispatch(taskActions.changeTaskEntityStatus({ taskId: arg.taskId, todolistId: arg.todolistId, entityStatus: "loading" }));

      const task = getState().tasks[arg.todolistId].find((t) => t.id === arg.taskId);
      if (!task) {
        console.warn("task not found in the state");
        return rejectWithValue(null);
      }

      const model: UpdateTaskType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...arg.domainModel
      };

      const res = await todolistApi.updateTask(arg.todolistId, arg.taskId, model);
      if (res.data.resultCode === ResultCode.Success) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        dispatch(taskActions.changeTaskEntityStatus({ taskId: arg.taskId, todolistId: arg.todolistId, entityStatus: "succeeded" }));
        return arg;

      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  }
);

export const tasksReducer = slice.reducer;
export const taskActions = slice.actions;
export const taskThunk = { fetchTasks, removeTask, addTask, updateTask };

//types
export type TaskDomainType = TaskType & {
  entityStatusTask: RequestStatusType;
};

export type TaskStateType = {
  [key: string]: TaskDomainType[] | TaskType[];
};


type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
}