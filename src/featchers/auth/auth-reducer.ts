import { PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "api/authApi";
import { appActions } from "app/app-reducer";
import { handleServerNetworkError } from "utils/handle-server-network-error";
import { LoginParamsType } from "api/todolistApi";
import { handleServerAppError } from "utils/handle-server-app-error";
import { todosActions } from "featchers/todolists/todos-reducer";
import { taskActions } from "featchers/todolists/todolist/tasks-reducer";
import { createAppSlice } from "utils/thunk_utils";


const authSlice = createAppSlice({
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
      initializedApp: createAThunk<undefined, { isLoggedIn: boolean }>(
        async (_, { dispatch, rejectWithValue }) => {
          try {
            const res = await authApi.me();
            if (res.data.resultCode === 0) {
              dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
            }
            dispatch(appActions.setAppInitialized({ isInitialized: true }));
            return { isLoggedIn: false };
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
      login: createAThunk<LoginParamsType, { isLoggedIn: boolean }>(
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
      logout: createAThunk<undefined, { isLoggedIn: boolean }>(
        async (_, { dispatch, rejectWithValue }) => {
          dispatch(appActions.setAppStatus({ status: "loading" }));

          try {
            const res = await authApi.logout();
            if (res.data.resultCode === 0) {
              dispatch(appActions.setAppStatus({ status: "succeeded" }));
              dispatch(todosActions.clearTodosData());
              dispatch(taskActions.clearTaskData());

              return { isLoggedIn: false };
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

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;


