import { appActions, appReducer, RequestStatusType } from "app/app-reducer";

describe("appReducer", () => {
  const initialState = {
    status: "loading" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  };

  it("should handle setAppError action", () => {
    const error = "Something went wrong";
    const action = appActions.setAppError({ error });

    const newState = appReducer(initialState, action);

    expect(newState.error).toEqual(error);
  });

  it("should handle setAppStatus action", () => {
    const status: RequestStatusType = "succeeded";
    const action = appActions.setAppStatus({ status });

    const newState = appReducer(initialState, action);

    expect(newState.status).toEqual(status);
  });

  it("should handle setAppInitialized action", () => {
    const isInitialized = true;
    const action = appActions.setAppInitialized({ isInitialized });

    const newState = appReducer(initialState, action);

    expect(newState.isInitialized).toEqual(isInitialized);
  });
});