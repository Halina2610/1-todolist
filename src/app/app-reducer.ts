import { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "utils/thunk_utils";


const appSlice = createAppSlice({
    name: "App",
    initialState: {
      status: "loading",
      error: null as string | null,
      isInitialized: false
    },
    reducers: (creators) => {
      return {
        setAppError: creators.reducer(
          (state,
           action: PayloadAction<{ error: string | null }>) => {
          state.error = action.payload.error;
        }),
        setAppStatus: creators.reducer(
          (state, action: PayloadAction<{ status: RequestStatusType }>) => {
          state.status = action.payload.status;
        }),
        setAppInitialized: creators.reducer(
          (state, action: PayloadAction<{ isInitialized: boolean }>) => {
          state.isInitialized = action.payload.isInitialized;
        })
      };
    }
  }
);

export const appReducer = appSlice.reducer;
export const appActions = appSlice.actions;


// types:
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

