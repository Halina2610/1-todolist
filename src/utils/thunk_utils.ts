import { asyncThunkCreator, buildCreateSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, AppRootStateType } from "app/store";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType
    dispatch: AppDispatch
    rejectValue: null
}>()

export const createAppSlice = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator }
});