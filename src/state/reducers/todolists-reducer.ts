import { TodolistType } from "../../api/todolists-api";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    removeTodolistAC,
    setTodolistsAC,
    updateTodolistTitleAC,
} from "../actionsAndThunck/actions";
import {RequestStatusType} from "./app-reducer";

const initialState: TodolistDomainType[] = [];

export const todolistsReducer = (
    state: TodolistDomainType[] = initialState,
    action: ActionsTodolistType
): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id);
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {...action.todolist, filter: "all", entityStatus: "idle"};
            return [newTodolist, ...state];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl =>
                tl.id === action.id ? { ...tl, title: action.title } : tl
            );
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl =>
                tl.id === action.id ? { ...tl, filter: action.filter } : tl
            );
        }
        case 'SET-TODOLISTS': {
            return action.todolists.map(td => ({ ...td, filter: 'all', entityStatus: "idle" }));
        }
        default:
            return state;
    }
};

export type ActionsTodolistType =
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof updateTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof setTodolistsAC>;

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType;
    entityStatus: RequestStatusType
};