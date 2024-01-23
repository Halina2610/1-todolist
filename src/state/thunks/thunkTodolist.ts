import {ThunkType} from "../store/store";
import {setAppErrorAC, setAppStatusAC} from "../actions/actionsApp";
import {todolistsApi} from "../../api/todolists-api";
import {addTodolistAC, removeTodolistAC, setTodolistsAC, updateTodolistTitleAC} from "../actions/actionsTodolists";
import {throws} from "assert";

export const fetchTodolistsTC = (): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await todolistsApi.getTodolists();
        dispatch(setTodolistsAC(res.data));
        dispatch(setAppStatusAC('succeeded'))

    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while fetching the todolists');
    }
};

export const removeTodolistTC = (todoListId: string): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        await todolistsApi.removeTodolist(todoListId);
        dispatch(removeTodolistAC(todoListId));
        dispatch(setAppStatusAC('succeeded'))

    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while removed the todolist');
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
            if (res.data.messages.length !== 0) {
                dispatch(setAppErrorAC(res.data.messages[0]));
            } else {
                dispatch(setAppErrorAC('Some error occurred'))
            }
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while added the todolist');
    }
};

export const updateTodolistTitleTC = (id: string, title: string): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await todolistsApi.updateTodolist(id, title);
        dispatch(updateTodolistTitleAC(id, title));
        dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while updated the todolist');
    }
};
