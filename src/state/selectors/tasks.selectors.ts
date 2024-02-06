import { AppRootStateType } from "state/store/store";

export const selectTasks = (state: AppRootStateType) => state.tasks;
