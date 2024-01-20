import { TaskStatuses, TaskType, TodolistType } from "../../api/todolists-api";
import { v1 } from "uuid";
import { FilterValuesType } from "../reducers/todolists-reducer";
import { UpdateDomainTaskModelType } from "./thunks";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK';
    todoListId: string;
    taskId: string;
};

export type AddTaskActionType = {
    type: 'ADD-TASK';
    task: TaskType;
};

export type SetTasksActionType = {
    type: "SET-TASKS";
    tasks: TaskType[];
    todoListId: string;
};

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST';
    id: string;
};

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST';
    todolist: TodolistType;
};

export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE';
    title: string;
    id: string;
};

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER';
    id: string;
    filter: FilterValuesType;
};

export type SetTodolistsActionType = {
    type: "SET-TODOLISTS";
    todolists: TodolistType[];
};

export const removeTaskAC = (taskId: string, todoListId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', taskId, todoListId };
};

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return { type: 'ADD-TASK', task };
};

export const updateTaskAC = (taskId: string, model: UpdateDomainTaskModelType, todolistId: string) => {
    return { type: 'UPDATE-TASK', model, todolistId, taskId } as const;
};

export const setTasksAC = (tasks: TaskType[], todoListId: string): SetTasksActionType => {
    return { type: "SET-TASKS", tasks, todoListId };
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId };
};

export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', todolist };
};

export const updateTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id, title };
};

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id, filter };
};

export const setTodolistsAC = (todolists: TodolistType[]): SetTodolistsActionType => {
    return { type: "SET-TODOLISTS", todolists };
};