import {
  handleServerAppError,
  handleServerNetworkError,
} from "../utils/handleServerAppError";
import { ThunkType } from "../store/store";
import { authApi } from "api/authApi";
import { LoginParamsType } from "api/todolistApi";
import { authActions } from "state/reducers/authSlice";
import { appActions } from "state/reducers/appSlice";
import { todolistsActions } from "state/reducers/todosSlice";
import { Dispatch } from "redux";
import { taskActions } from "state/reducers/tasksSlice";

export const initializeAppTC = () => async (dispatch: Dispatch) => {
  try {
    const res = await authApi.me();
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn({isLoggedIn: true}));
    }
    dispatch(appActions.setAppInitialized ({ isInitialized: true}));
  } catch (error: any) {
    handleServerNetworkError(error, dispatch);
  }
};

export const loginTC =
  (data: LoginParamsType): ThunkType =>
  async (dispatch) => {
    dispatch(appActions.setAppStatus({ status: "loading" }));

    try {
      const res = await authApi.login(data);
      if (res.data.resultCode === 0) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
        dispatch(appActions.setAppStatus({ status: "succeeded"}));
      } else {
        handleServerAppError(res.data, dispatch);
      }
      dispatch(appActions.setAppInitialized ({ isInitialized: true}));
    } catch (error: any) {
      handleServerNetworkError(error, dispatch);
    }
  };

export const logoutTC = (): ThunkType => async (dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading"}));

  try {
    const res = await authApi.logout();
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn({isLoggedIn: false}));
      dispatch(appActions.setAppStatus({status: "succeeded"}));
      dispatch(todolistsActions.clearTodosData());
      dispatch(taskActions.clearTaskData());

    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (error: any) {
    handleServerNetworkError(error, dispatch);
  }
};
