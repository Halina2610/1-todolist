import {
  setAppErrorAC,
  setAppInitializedAC,
  setAppStatusAC,
} from "../actions/actionsApp";

const initialState: InitialAppStateType = {
  status: "loading",
  error: null,
  isInitialized: false,
};

export const appReducer = (
  state: InitialAppStateType = initialState,
  action: AppReducerActionsType,
): InitialAppStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    case "APP/SET-ERROR": {
      return { ...state, error: action.error };
    }
    case "APP/SET-INITIALIZED": {
      return { ...state, isInitialized: action.value };
    }
    default:
      return state;
  }
};

// types:
export type AppReducerActionsType =
  | ReturnType<typeof setAppStatusAC>
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setAppInitializedAC>;

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type InitialAppStateType = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean;
};
