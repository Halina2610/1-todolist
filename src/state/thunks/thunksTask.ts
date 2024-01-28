import {
  TaskPriorities,
  TaskStatuses,
  todolistApi,
  UpdateTaskType,
} from "api/todolistApi";
import {
  addTaskAC,
  changeTaskEntityStatusAC,
  removeTaskAC,
  setTasksAC,
  updateTaskAC,
} from "../actions/actionsTasks";
import { ThunkType } from "../store/store";
import { setAppErrorAC, setAppStatusAC } from "../actions/actionsApp";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../utils/handleServerAppError";

export const fetchTasksTC =
  (todolistId: string): ThunkType =>
  async (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    try {
      const res = await todolistApi.getTasks(todolistId);
      dispatch(setTasksAC(res.data.items, todolistId));
      dispatch(setAppStatusAC("succeeded"));

      if (res.data.error !== null) {
        dispatch(setAppErrorAC(res.data.error));
        console.error(res.data.totalCount);
      }
    } catch (error: any) {
      handleServerNetworkError(error, dispatch);
    }
  };

export const removeTaskTC =
  (id: string, todoListId: string): ThunkType =>
  async (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    dispatch(changeTaskEntityStatusAC(id, todoListId, "loading"));
    try {
      await todolistApi.removeTask(id, todoListId);
      dispatch(removeTaskAC(id, todoListId));
      dispatch(setAppStatusAC("succeeded"));
      dispatch(changeTaskEntityStatusAC(id, todoListId, "succeeded"));
    } catch (error: any) {
      handleServerNetworkError(error, dispatch);
    }
  };

export const addTaskTC =
  (title: string, todoListId: string): ThunkType =>
  async (dispatch) => {
    dispatch(setAppStatusAC("loading"));
    try {
      const res = await todolistApi.addTask(title, todoListId);
      if (res.data.resultCode === 0) {
        dispatch(addTaskAC(res.data.data.item));
        dispatch(setAppStatusAC("succeeded"));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    } catch (error: any) {
      handleServerNetworkError(error, dispatch);
    }
  };

export const updateTaskTC =
  (
    taskId: string,
    domainModel: UpdateDomainTaskModelType,
    todolistId: string,
  ): ThunkType =>
  async (dispatch, getState) => {
    dispatch(setAppStatusAC("loading"));
    dispatch(changeTaskEntityStatusAC(taskId, todolistId, "loading"));

    try {
      const task = getState().tasks[todolistId].find((t) => t.id === taskId);
      if (!task) {
        console.warn("task not found in the state");
        return;
      }

      const model: UpdateTaskType = {
        deadline: task.deadline,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        title: task.title,
        status: task.status,
        ...domainModel,
      };

      await todolistApi.updateTask(todolistId, taskId, model);
      dispatch(updateTaskAC(taskId, domainModel, todolistId));
      dispatch(setAppStatusAC("succeeded"));
      dispatch(changeTaskEntityStatusAC(taskId, todolistId, "succeeded"));
    } catch (error: any) {
      handleServerNetworkError(error, dispatch);
    }
  };

// types
export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
};
