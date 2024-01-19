import {TaskType, todolistsApi} from '../../api/todolists-api';
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


export const removeTaskTC = (id: string, todolistId: string): ThunkType => {
    return async (dispatch) => {
        try {
            await todolistsApi.deleteTask(id, todolistId)
            dispatch(removeTaskAC(id, todolistId))
        }
        catch (error) {
            console.log(error)
        }
    }
}

export const addTaskTC = (todolistId: string, title: string): ThunkType => {
    return async (dispatch) => {
        try {
            const res = await todolistsApi.createTask(todolistId, title);
            dispatch(addTaskAC(res.data.data.item));

        } catch (error) {
            console.log(error);
        }
    };
};