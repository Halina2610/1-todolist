import { AxiosResponse } from "axios";
import { commonTs } from "api/common.ts.";
import {ResponseType} from "types/common.types"
import { TaskPriorities, TaskStatuses } from "enums";


export const todolistApi = {
  getTodolists() {
    return commonTs.get<TodolistType[]>("todo-lists");
  },

  addTodolist(title: string) {
    return commonTs.post<ResponseType<{ item: TodolistType }>>("todo-lists", {
      title,
    });
  },

  updateTodolist(id: string, title: string) {
    return commonTs.put<ResponseType>(`todo-lists/${id}`, { title });
  },

  removeTodolist(todolistId: string) {
    return commonTs.delete<ResponseType>(`todo-lists/${todolistId}`);
  },

  getTasks(todoListId: string) {
    return commonTs.get<TasksResponseType>(`todo-lists/${todoListId}/tasks`);
  },

  addTask(title: string, todoListId: string) {
    return commonTs.post<ResponseType<{ item: TaskType }>>(
      `todo-lists/${todoListId}/tasks`,
      { title },
    );
  },

  updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
    return commonTs.put<
      ResponseType<{ item: TaskType }>,
      AxiosResponse<ResponseType<{ item: TaskType }>>,
      UpdateTaskType
    >(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },

  removeTask(taskId: string, todolistId: string) {
    return commonTs.delete<ResponseType>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
    );
  },
};

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};


export type TaskType = {
  description: string;
  title: string;
  completed?: boolean;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type UpdateTaskType = {
  title: string;
  description: string;
  status: TaskStatuses;
  priority: number;
  startDate: string;
  deadline: string;
};

type TasksResponseType = {
  items: TaskType[];
  totalCount: number;
  error: string | null;
};

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
