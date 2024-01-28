import {TodolistType} from "../../api/todolistApi";
import {FilterValuesType} from "../reducers/todolists-reducer";
import {RequestStatusType} from "../reducers/app-reducer";

export const removeTodolistAC = (todolistId: string) => ({ type: 'REMOVE-TODOLIST', id: todolistId } as const);
export const addTodolistAC = (todolist: TodolistType) => ({ type: 'ADD-TODOLIST', todolist } as const);
export const updateTodolistTitleAC = (id: string, title: string) => ({ type: 'CHANGE-TODOLIST-TITLE', id, title } as const);
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({ type: 'CHANGE-TODOLIST-FILTER', id, filter } as const);
export const setTodolistsAC = (todolists: TodolistType[]) => ({ type: "SET-TODOLISTS", todolists } as const);
export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) => ({type: "CHANGE-TODOLIST-ENTITY-STATUS", id, status} as const)