import { todolistApi, TodolistType } from "api/todolistApi";
import { appActions, RequestStatusType } from "app/app-reducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "utils/thunk_utils";
import { handleServerNetworkError } from "utils/handle-server-network-error";
import { taskThunk } from "featchers/todolists/todolist/tasks-reducer";
import { handleServerAppError } from "utils/handle-server-app-error";
import { ResultCode } from "enums";

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.filter = action.payload.filter;
      }
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
      const todo = state.find((todo) => todo.id === action.payload.id);
      if (todo) {
        todo.entityStatus = action.payload.entityStatus;
      }
    },
    clearTodosData: () => {
      return [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.forEach((t) => {
          state.push({ ...t, filter: "active", entityStatus: "idle" });
        });
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((todo) => todo.id === action.payload.id);
        if (index !== -1) state.splice(index, 1);
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        const newTodolist: TodolistDomainType = { ...action.payload.todolist, filter: "all", entityStatus: "idle" };
        state.unshift(newTodolist);
      })
      .addCase(updateTodolistTitle.fulfilled, (state, action) => {
        const todo = state.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.title = action.payload.title;
        }
      })
  }
});


//thunks
const fetchTodolists = createAppAsyncThunk<
  { todolists: TodolistType[] }, void
>(
  `${slice.name}/fetchTodolists`, async (_, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;

    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));

      const res = await todolistApi.getTodolists();
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      res.data.forEach((tl) => {
        dispatch(taskThunk.fetchTasks(tl.id));
      });
      return {todolists: res.data};
    }  catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  }
);

const removeTodolist = createAppAsyncThunk<{ id: string }, string>
(`${slice.name}/removeTodolist`, async (id, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: "loading" }));
    dispatch(
      todosActions.changeTodolistEntityStatus({
        id,
        entityStatus: "loading",
      })
    );
    const res = await todolistApi.removeTodolist(id);

    if (res.data.resultCode === ResultCode.Success) {
      dispatch(appActions.setAppStatus({ status: "succeeded" }));
      return { id };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});



const addTodolist = createAppAsyncThunk<{todolist: TodolistType}, string>
(`${slice.name}/addTodolist`, async (title, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
      try {
        dispatch(appActions.setAppStatus({status:"loading"}));
        const res = await todolistApi.addTodolist(title);
        if (res.data.resultCode === 0) {
          dispatch(appActions.setAppStatus({status:"succeeded"}));
          return {todolist: res.data.data.item};

        } else {
          handleServerAppError(res.data, dispatch);
          return rejectWithValue(null)
        }
      } catch (e) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null)
      }
});


const updateTodolistTitle = createAppAsyncThunk<{id: string, title: string}, {id: string, title: string}>
(
  "todo/changeTodolistTitle",
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: "loading" }));
      dispatch(todosActions.changeTodolistEntityStatus({  id: arg.id, entityStatus:"loading"}));
      const res = await todolistApi.updateTodolist(arg.id, arg.title);
      if (res.data .resultCode === ResultCode.Success) {
        dispatch(appActions.setAppStatus({ status: "succeeded" }));
        dispatch(todosActions.changeTodolistEntityStatus({id: arg.id, entityStatus: "succeeded"}));
        return arg;
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  },
);
export const todosReducer = slice.reducer;
export const todosActions = slice.actions;
export const todosThunks = {fetchTodolists, removeTodolist, addTodolist, updateTodolistTitle}

//types
export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};
