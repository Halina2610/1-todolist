import { setAppInitializedAC, setAppStatusAC } from "../actions/actionsApp";
import { setIsLoggedInAC } from "../actions/actionAuth";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../utils/handleServerAppError";
import { ThunkType } from "../store/store";
import { authApi } from "api/authApi";
import { LoginParamsType } from "api/todolistApi";
import { clearTodosDataAC } from "state/actions/actionsTodolists";

export const initializedAppTC = (): ThunkType => async (dispatch) => {
  try {
    const res = await authApi.me();
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true));
    }
    dispatch(setAppInitializedAC(true));
  } catch (error: any) {
    handleServerNetworkError(error, dispatch);
  }
};

export const loginTC =
  (data: LoginParamsType): ThunkType =>
  async (dispatch) => {
    dispatch(setAppStatusAC("loading"));

    try {
      const res = await authApi.login(data);
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(true));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(res.data, dispatch);
      }
      dispatch(setAppInitializedAC(true));
    } catch (error: any) {
      handleServerNetworkError(error, dispatch);
    }
  };

export const logoutTC = (): ThunkType => async (dispatch) => {
  dispatch(setAppStatusAC("loading"));

  try {
    const res = await authApi.logout();
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(false));
      dispatch(setAppStatusAC("succeeded"));
      dispatch(clearTodosDataAC());

    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (error: any) {
    handleServerNetworkError(error, dispatch);
  }
};

// types
export type AuthActionsType = ReturnType<typeof setIsLoggedInAC>;
