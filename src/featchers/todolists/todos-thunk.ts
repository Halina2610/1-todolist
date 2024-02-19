import { ThunkType } from "app/store";
import { todolistApi } from "api/todolistApi";

import {
  handleServerAppError,
} from "utils/handle-server-app-error";
import { appActions } from "app/app-reducer";
import { todolistsActions } from "featchers/todolists/todos-reducer";
import { handleServerNetworkError } from "utils/handle-server-network-error";
import { taskThunk } from "featchers/todolists/todolist/tasks-reducer";

export const fetchTodolistsTC = (): ThunkType => async (dispatch) => {
  dispatch(appActions.setAppStatus({status: "loading"}));
  try {
    const res = await todolistApi.getTodolists();
    dispatch(todolistsActions.setTodolists({todolists: res.data}));
    dispatch(appActions.setAppStatus({status:"succeeded"}));
    res.data.forEach((tl) => {
      dispatch(taskThunk.fetchTasks(tl.id))
    })

  } catch (error: any) {
    handleServerNetworkError(error, dispatch);
  }
};

export const removeTodolistTC =
  (todoListId: string): ThunkType =>
  async (dispatch) => {
    dispatch(appActions.setAppStatus({status: "loading"}));
    dispatch(todolistsActions.changeTodolistEntityStatus({ id: todoListId, entityStatus:"loading"}));
    try {
      await todolistApi.removeTodolist(todoListId);
      dispatch(todolistsActions.removeTodolist({id: todoListId}));
      dispatch(appActions.setAppStatus({status:"succeeded"}));
    } catch (error: any) {
      handleServerNetworkError(error, dispatch);
    }
  };

export const addTodolistTC =
  (title: string): ThunkType =>
  async (dispatch) => {
    dispatch(appActions.setAppStatus({status:"loading"}));

    try {
      const res = await todolistApi.addTodolist(title);
      if (res.data.resultCode === 0) {
        dispatch(todolistsActions.addTodolist({todolist: res.data.data.item}));
        dispatch(appActions.setAppStatus({status:"succeeded"}));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (error: any) {
      handleServerNetworkError(error, dispatch);
    }
  };

export const updateTodolistTitleTC =
  (id: string, title: string): ThunkType =>
  async (dispatch) => {
    dispatch(appActions.setAppStatus({status:"loading"}));
    dispatch(todolistsActions.changeTodolistEntityStatus({ id, entityStatus:"loading"}));

    try {
      await todolistApi.updateTodolist(id, title);
      dispatch(todolistsActions.changeTodolistTitle({id, title}));
      dispatch(appActions.setAppStatus({status:"succeeded"}));
      dispatch(todolistsActions.changeTodolistEntityStatus({id, entityStatus: "succeeded"}));
    }
    catch (error: any) {
      handleServerNetworkError(error, dispatch);
    }
  };
