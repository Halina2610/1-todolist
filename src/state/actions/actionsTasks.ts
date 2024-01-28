import { TaskType } from "../../api/todolistApi";
import { UpdateDomainTaskModelType } from "../thunks/thunksTask";
import {RequestStatusType} from "../reducers/app-reducer";


//actions for task
export const removeTaskAC = (taskId: string, todoListId: string) => ({ type: 'REMOVE-TASK', taskId, todoListId } as const);
export const addTaskAC = (task: TaskType) => ({ type: 'ADD-TASK', task } as const)
export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => ({ type: 'UPDATE-TASK', model, todolistId, taskId } as const);
export const setTasksAC = (tasks: TaskType[], todoListId: string) => ({ type: "SET-TASKS", tasks, todoListId } as const);

export const changeTaskEntityStatusAC = (taskId: string, todolistId: string, entityTaskStatus: RequestStatusType) =>

({type: 'CHANGE-TASK-ENTITY-STATUS', taskId, todolistId, entityTaskStatus} as const)
