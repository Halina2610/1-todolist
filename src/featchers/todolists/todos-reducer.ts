import { TaskType, todolistApi, TodolistType } from "api/todolistApi";
import { appActions, RequestStatusType } from "app/app-reducer";
import { AsyncThunkAction, PayloadAction } from "@reduxjs/toolkit";
import { handleServerNetworkError } from "utils/handle-server-network-error";
import { handleServerAppError } from "utils/handle-server-app-error";
import { ResultCode } from "enums";
import { taskActions} from "featchers/todolists/todolist/tasks-reducer";
import { createAppSlice } from "utils/thunk_utils";


const slice = createAppSlice({
  name: "todos",
  initialState: [] as TodolistDomainType[],
  reducers: (creators) => {
    const createAThunk = creators.asyncThunk.withTypes<{ rejectValue: null }>();
    return {
      changeTodoFilter: creators.reducer((state, action: PayloadAction<{
        id: string;
        filter: FilterValuesType
      }>) => {
        const todo = state.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.filter = action.payload.filter;
        }
      }),
      changeTodolistEntityStatus: creators.reducer((state, action: PayloadAction<{
        id: string;
        entityStatus: RequestStatusType
      }>) => {
        const todo = state.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.entityStatus = action.payload.entityStatus;
        }
      }),
      clearTodosData: creators.reducer(() => {
        return [];
      }),
      fetchTodos: createAThunk<undefined, { todos: TodolistType[] }>(
        async (_, { dispatch, rejectWithValue }) => {
          try {
            dispatch(appActions.setAppStatus({ status: "loading" }));
            const res = await todolistApi.getTodolists();
            dispatch(appActions.setAppStatus({ status: "succeeded" }));
            res.data.map((tl) => {
              dispatch(taskActions.fetchTasks(tl.id) as AsyncThunkAction<{ tasks: TaskType[]; todolistId: string }, string, any>);
            });
            return  { todos: res.data };
          } catch (e) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null);
          }
        },
        {
          fulfilled: (_state, action) => {
            return action.payload.todos.map((tl) => ({ ...tl, filter: "all", entityStatus: "idle" }));
          }
        }
      ),
      removeTodos: createAThunk<string, { id: string }, any>(async (id, { dispatch, rejectWithValue }) => {
          try {
            dispatch(appActions.setAppStatus({ status: "loading" }));
            dispatch(
              todosActions.changeTodolistEntityStatus({
                id,
                entityStatus: "loading"
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
        },
        {
          fulfilled: (state, action) => {
            const index = state.findIndex((todo) => todo.id === action.payload.id);
            if (index !== -1) {
              return [...state.slice(0, index), ...state.slice(index + 1)];
            }
            return state;
          }
        }
      ),
      addTodos: createAThunk<string, { todolist: TodolistType }>(async (title, { dispatch, rejectWithValue }) => {
          try {
            dispatch(appActions.setAppStatus({ status: "loading" }));
            const res = await todolistApi.addTodolist(title);
            if (res.data.resultCode === 0) {
              dispatch(appActions.setAppStatus({ status: "succeeded" }));
              return { todolist: res.data.data.item };

            } else {
              handleServerAppError(res.data, dispatch);
              return rejectWithValue(null);
            }
          } catch (e) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null);
          }
        },
        {
          fulfilled: (state, action) => {
            const newTodolist: TodolistDomainType = { ...action.payload.todolist, filter: "all", entityStatus: "idle" };
            state.unshift(newTodolist);
          }
        }
      ),
      updateTodoTitle: createAThunk<{ id: string, title: string }, { id: string, title: string }>(
        async (arg, { dispatch, rejectWithValue }) => {
          try {
            dispatch(appActions.setAppStatus({ status: "loading" }));
            dispatch(todosActions.changeTodolistEntityStatus({ id: arg.id, entityStatus: "loading" }));
            const res = await todolistApi.updateTodolist(arg.id, arg.title);
            if (res.data.resultCode === ResultCode.Success) {
              dispatch(appActions.setAppStatus({ status: "succeeded" }));
              dispatch(todosActions.changeTodolistEntityStatus({ id: arg.id, entityStatus: "succeeded" }));
              return arg;
            } else {
              handleServerAppError(res.data, dispatch);
              return rejectWithValue(null);
            }
          } catch (e) {
            handleServerNetworkError(e, dispatch);
            return rejectWithValue(null);
          }
        }, {
          fulfilled: (state, action) => {
            const todo = state.find((todo) => todo.id === action.payload.id);
            if (todo) {
              todo.title = action.payload.title;
            }
          }
        }
      )
    };
  }
});


export const todosReducer = slice.reducer;
export const todosActions = slice.actions;
//types
export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};