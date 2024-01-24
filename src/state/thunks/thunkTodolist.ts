import {ThunkType} from "../store/store";
import {setAppStatusAC} from "../actions/actionsApp";
import {todolistsApi} from "../../api/todolists-api";
import {
    addTodolistAC,
    changeTodolistEntityStatusAC,
    removeTodolistAC,
    setTodolistsAC,
    updateTodolistTitleAC
} from "../actions/actionsTodolists";
import {handleServerAppError, handleServerNetworkError} from "../utils/handleServerAppError";

export const fetchTodolistsTC = (): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await todolistsApi.getTodolists();
        dispatch(setTodolistsAC(res.data));
        dispatch(setAppStatusAC('succeeded'))

    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
};

export const removeTodolistTC = (todoListId: string): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(todoListId, 'loading'))
    try {
        await todolistsApi.removeTodolist(todoListId);
        dispatch(removeTodolistAC(todoListId));
        dispatch(setAppStatusAC('succeeded'))
        dispatch(changeTodolistEntityStatusAC(todoListId, 'succeeded'))


    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
};

export const addTodolistTC = (title: string): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await todolistsApi.addTodolist(title);
        if (res.data.resultCode === 0) {
            dispatch(addTodolistAC(res.data.data.item));
            dispatch(setAppStatusAC('succeeded'))

        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
};

export const updateTodolistTitleTC = (id: string, title: string): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTodolistEntityStatusAC(id, 'loading'))

    try {
        await todolistsApi.updateTodolist(id, title);
        dispatch(updateTodolistTitleAC(id, title));
        dispatch(setAppStatusAC('succeeded'))
        dispatch(changeTodolistEntityStatusAC(id, 'succeeded'))

    } catch (error: any) {
        handleServerNetworkError(error, dispatch)
    }
};
