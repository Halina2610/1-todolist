import { TaskType, TodolistType } from "../../api/todolists-api";
import { FilterValuesType } from "../reducers/todolists-reducer";
import { UpdateDomainTaskModelType } from "../thunks/thunksTask";
import {RequestStatusType} from "../reducers/app-reducer";


//actions for task
export const removeTaskAC = (taskId: string, todoListId: string) => ({ type: 'REMOVE-TASK', taskId, todoListId } as const);
export const addTaskAC = (task: TaskType) => ({ type: 'ADD-TASK', task } as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({ type: 'UPDATE-TASK', model, todolistId, taskId } as const);
export const setTasksAC = (tasks: TaskType[], todoListId: string) => ({ type: "SET-TASKS", tasks, todoListId } as const);


//actions for todolist


//actions for app
