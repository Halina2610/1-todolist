import {
  TaskPriorities,
  TaskStatuses,
  todolistApi,
  UpdateTaskType,
} from "api/todolistApi";
import { ThunkType } from "../store/store";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../utils/handleServerAppError";
import { appActions } from "state/reducers/app-reducer";
import { taskActions } from "state/reducers/tasks-reducer";

export const fetchTasksTC =
  (todolistId: string): ThunkType =>
  async (dispatch) => {
    dispatch(appActions.setAppStatus({status:"loading"}));
    try {
      const res = await todolistApi.getTasks(todolistId);
      dispatch(taskActions.setTasks({ tasks: res.data.items, todolistId}));
      dispatch(appActions.setAppStatus({status:"succeeded"}));

      if (res.data.error !== null) {
        dispatch(appActions.setAppError({error: res.data.error}));
        console.error(res.data.totalCount);
      }
    } catch (error: any) {
      handleServerNetworkError(error, dispatch);
    }
  };

export const removeTaskTC =
  (id: string, todoListId: string): ThunkType =>
  async (dispatch) => {
    dispatch(appActions.setAppStatus({status: "loading"}));
    try {
      await todolistApi.removeTask(id, todoListId);
      dispatch(taskActions.removeTask({taskId: id, todolistId: todoListId}));
      dispatch(appActions.setAppStatus({status:"succeeded"}));
    } catch (error: any) {
      handleServerNetworkError(error, dispatch);
    }
  };



export const addTaskTC =
  (title: string, todoListId: string): ThunkType =>
  async (dispatch) => {
    dispatch(appActions.setAppStatus({status: "loading"}));
    try {
      const res = await todolistApi.addTask(title, todoListId);
      if (res.data.resultCode === 0) {
        dispatch(taskActions.addTask({task: res.data.data.item, todolistId: res.data.data.item.todoListId }));
        dispatch(appActions.setAppStatus({status:"succeeded"}));
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
    dispatch(appActions.setAppStatus({status: "loading"}));
    dispatch(taskActions.changeTaskEntityStatus({taskId, todolistId, entityStatus: "loading"}));

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
      dispatch(taskActions.updateTask({taskId, model: domainModel, todolistId}));
      dispatch(appActions.setAppStatus({status:"succeeded"}));
      dispatch(taskActions.changeTaskEntityStatus({taskId, todolistId, entityStatus: "succeeded"}));
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
