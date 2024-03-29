import { appActions, appReducer, RequestStatusType } from "app/app-reducer";
export type InitialAppStateType = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean;
};
describe("appReducer", () => {
  let initialState: InitialAppStateType;

  beforeEach(() => {
    initialState = {
      status: "loading",
      error: null,
      isInitialized: true,
    };
  });

  it("should set status correctly", () => {
    const action = appActions.setAppStatus({status: "succeeded"});
    const newState = appReducer(initialState, action);

    expect(newState.status).toBe("succeeded");
    expect(newState.error).toBeNull();
  });

  it("should set error correctly", () => {
    const error = "Something went wrong!";
    const action = appActions.setAppError({error});
    const newState = appReducer(initialState, action);

    expect(newState.status).toBe("loading");
    expect(newState.error).toBe(error);
  });
});
