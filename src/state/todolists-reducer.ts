import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

export type ActionsTodolistType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistTitleActionType | ChangeTodolistFilterActionType;

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsTodolistType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id);

        case 'ADD-TODOLIST':
            return [...state, {id: action.todolistId, title: action.title, filter: "all"}];

        case 'CHANGE-TODOLIST-TITLE': {
            const newState = state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title};
                }
                return tl;
            });
            return newState;
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const newState = state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, filter: action.filter};
                }
                return tl;
            });
            return newState;
        }

        default:
            throw new Error("I don't understand this type");
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId, }
}
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', title: title, id: todolistId}
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: todolistId}
}
