import { PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "api/authApi";
import { appActions } from "app/app-reducer";
import { handleServerNetworkError } from "utils/handle-server-network-error";
import { LoginParamsType } from "api/todolistApi";
import { ThunkType } from "app/store";
import { handleServerAppError } from "utils/handle-server-app-error";
import { todosActions } from "featchers/todolists/todos-reducer";
import { taskActions } from "featchers/todolists/todolist/tasks-reducer";
import { createAppSlice } from "utils/thunk_utils";


const slice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false
  },
  reducers: (creators) => {

    const createAThunk = creators.asyncThunk.withTypes<{ rejectValue: null }>();
    return {
      setIsLoggedIn: creators.reducer((state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      }),
      initializedApp: createAThunk<undefined, undefined>(
        async (_, { dispatch, rejectWithValue }) => {
          try {
            const res = await authApi.me();
            if (res.data.resultCode === 0) {
              dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
            }
            dispatch(appActions.setAppInitialized({ isInitialized: true }));
          } catch (error: any) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(null);
          }
        }
      ),
      login: createAThunk<LoginParamsType, any>(
        async (data, { dispatch, rejectWithValue }) => {
          dispatch(appActions.setAppStatus({ status: "loading" }));
          try {
            const res = await authApi.login(data);
            if (res.data.resultCode === 0) {
              dispatch(appActions.setAppStatus({ status: "succeeded" }));
              dispatch(appActions.setAppInitialized({ isInitialized: true }));
              return { isLoggedIn: true };
            } else {
              handleServerAppError(res.data, dispatch);
              return rejectWithValue(null);
            }
          } catch (error: any) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(null);
          }
        }, {
          fulfilled: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
          }
        }
      ),
      logout: createAThunk<undefined, { isLoggedIn: false }>(
        async (_, { dispatch, rejectWithValue }) => {
          dispatch(appActions.setAppStatus({ status: "loading" }));

          try {
            const res = await authApi.logout();

            if (res.data.resultCode === 0) {
              dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
              dispatch(appActions.setAppStatus({ status: "succeeded" }));
              dispatch(todosActions.clearTodosData());
              dispatch(taskActions.clearTaskData());
              return rejectWithValue(null);
            } else {
              handleServerAppError(res.data, dispatch);
              return rejectWithValue(null);
            }
          } catch (error: any) {
            handleServerNetworkError(error, dispatch);
            return rejectWithValue(null);
          }
        }, {
          fulfilled: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn;
          }
        }
      )

    };
  }
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;


export const _logoutTC = (): ThunkType => async (dispatch) => {
  dispatch(appActions.setAppStatus({ status: "loading" }));


};
