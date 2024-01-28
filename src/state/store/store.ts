import { ActionsTaskType, tasksReducer } from "../reducers/tasks-reducer";
import {
  ActionsTodolistType,
  todolistsReducer,
} from "../reducers/todolists-reducer";
import {
  AnyAction,
  applyMiddleware,
  combineReducers,
  legacy_createStore,
} from "redux";
import thunkMiddleware, { ThunkAction, ThunkDispatch } from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { appReducer, AppReducerActionsType } from "../reducers/app-reducer";
import { authReducer } from "../reducers/auth-reducer";
import { AuthActionsType } from "../thunks/thunkAuth";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
});

export const store = legacy_createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware),
);

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> =
  useSelector;

// @ts-ignore
window.store = store;

// types
export type AppRootStateType = ReturnType<typeof rootReducer>;

export type AppActionsType =
  | ActionsTaskType
  | ActionsTodolistType
  | AppReducerActionsType
  | AuthActionsType;

export type AppThunkDispatch = ThunkDispatch<AppRootStateType, any, AnyAction>;

export type ThunkType = ThunkAction<
  void,
  AppRootStateType,
  unknown,
  AppActionsType
>;
