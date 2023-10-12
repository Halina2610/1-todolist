import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST';
    id: string;
};

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}

export type ChangeTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}

type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistActionType
    | ChangeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.todolistId !== action.id);
        }
        case 'ADD-TODOLIST': {
            return [
                ...state,
                {
                    todolistId: v1(),
                    title: action.title,
                    filter: 'all'
                }
            ];
        }


        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => {
                if (tl.todolistId === action.id) {
                    return {
                        ...tl,
                        title: action.title
                    };
                }
                return tl;
            });
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => {
                if (tl.todolistId === action.id) {
                    return {
                        ...tl,
                        filter: action.filter
                    };
                }
                return tl;
            });
        }
        default:
            throw new Error("I don't understand this action type");
    }
};


export const RemoveTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId };
};
export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title };
}

export const ChangeTodolistTitleAC = (id: string, title: string): ChangeTodolistActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title };
}



export const ChangeTodolistFilterAC = (filter: FilterValuesType, id: string): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', filter: filter, id: id };
}