import {todolistsApi} from '../../api/todolists-api';
import {addTaskAC, removeTaskAC, setTasksAC, setTodolistsAC} from "./actions";
import {AppActionsType, AppRootStateType} from "../store/store";
import {ThunkAction} from "redux-thunk";

type ThunkType<ReturnType = void> = ThunkAction<
    void,
    AppRootStateType,
    unknown,
    AppActionsType
>;
export const fetchTodolistsTC = (): ThunkType => {
    return async (dispatch) => {
        try {
            const res = await todolistsApi.getTodolists();
            dispatch(setTodolistsAC(res.data));
        } catch (error) {
            console.log(error)
        }
    };
};

export const fetchTasksTC = (todolistId: string): ThunkType => {
    return async (dispatch) => {
        try {
            const res = await todolistsApi.getTasks(todolistId);
            dispatch(setTasksAC(res.data.items, todolistId));

        } catch (error) {
            console.log(error)
        }
    };
};


export const removeTaskTC = (id: string, todoListId: string): ThunkType => {
    return async (dispatch) => {
        try {
            await todolistsApi.deleteTask(id, todoListId)
            dispatch(removeTaskAC(id, todoListId))
        }
        catch (error) {
            console.log(error)
        }
    }
}

export const addTaskTC = (title: string, todoListId: string): ThunkType => {
    return async (dispatch) => {
        try {
            const res = await todolistsApi.createTask(title, todoListId);
            dispatch(addTaskAC(res.data.data.item));

        } catch (error) {
            console.log(error);
        }
    };
};