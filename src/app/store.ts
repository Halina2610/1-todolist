import { tasksReducer } from "featchers/todolists/todolist/tasks-reducer";
import {
  todosReducer,
} from "featchers/todolists/todos-reducer";
import  { ThunkAction, ThunkDispatch } from "redux-thunk";
import { appReducer } from "app/app-reducer";
import { authReducer } from "featchers/auth/auth-reducer";
import { configureStore, UnknownAction } from "@reduxjs/toolkit";

export const store = configureStore({reducer:{
    tasks: tasksReducer,
    todos: todosReducer,
    app: appReducer,
    auth: authReducer }})

export type AppRootStateType = ReturnType<typeof store.getState>

export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>


export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>
