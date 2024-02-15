import { tasksReducer } from "state/reducers/tasks-reducer";
import {
  todosReducer,
} from "state/reducers/todos-reducer";

import  { ThunkAction, ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import { appReducer } from "state/reducers/app-reducer";
import { authReducer } from "state/reducers/auth-reducer";
import { configureStore, UnknownAction } from "@reduxjs/toolkit";

export const store = configureStore({reducer:{
    tasks: tasksReducer,
    todos: todosReducer,
    app: appReducer,
    auth: authReducer }})

export type AppRootStateType = ReturnType<typeof store.getState>

export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>
