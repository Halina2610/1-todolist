import { tasksSlice } from "state/reducers/tasksSlice";
import {
  todosReducer,
} from "state/reducers/todosSlice";

import  { ThunkAction, ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import { appSlice } from "state/reducers/appSlice";
import { authSlice } from "state/reducers/authSlice";
import { configureStore, UnknownAction } from "@reduxjs/toolkit";

export const store = configureStore({reducer:{
    tasks: tasksSlice,
    todos: todosReducer,
    app: appSlice,
    auth: authSlice }})

export type AppRootStateType = ReturnType<typeof store.getState>

export type ThunkType<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>
