import { RequestStatusType } from "../reducers/app-reducer";

export const setAppStatusAC = (status: RequestStatusType) =>
  ({ type: "APP/SET-STATUS", status }) as const;
export const setAppErrorAC = (error: string | null) =>
  ({ type: "APP/SET-ERROR", error }) as const;

export const setAppInitializedAC = (value: boolean) =>
  ({ type: "APP/SET-INITIALIZED", value }) as const;
