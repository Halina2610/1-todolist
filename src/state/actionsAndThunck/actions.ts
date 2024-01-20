import { TaskType, TodolistType } from "../../api/todolists-api";
import { FilterValuesType } from "../reducers/todolists-reducer";
import { UpdateDomainTaskModelType } from "./thunks";

export const removeTaskAC = (taskId: string, todoListId: string) => ({ type: 'REMOVE-TASK', taskId, todoListId } as const);

export const addTaskAC = (task: TaskType) => ({ type: 'ADD-TASK', task } as const);

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({ type: 'UPDATE-TASK', model, todolistId, taskId } as const);

export const setTasksAC = (tasks: TaskType[], todoListId: string) => ({ type: "SET-TASKS", tasks, todoListId } as const);

export const removeTodolistAC = (todolistId: string) => ({ type: 'REMOVE-TODOLIST', id: todolistId } as const);

export const addTodolistAC = (todolist: TodolistType) => ({ type: 'ADD-TODOLIST', todolist } as const);

export const updateTodolistTitleAC = (id: string, title: string) => ({ type: 'CHANGE-TODOLIST-TITLE', id, title } as const);

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({ type: 'CHANGE-TODOLIST-FILTER', id, filter } as const);

export const setTodolistsAC = (todolists: TodolistType[]) => ({ type: "SET-TODOLISTS", todolists } as const);
