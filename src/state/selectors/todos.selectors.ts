import { AppRootStateType } from "state/store/store";

export const selectTodolists = (state: AppRootStateType) => state.todos;
