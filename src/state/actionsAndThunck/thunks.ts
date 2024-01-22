import {TaskPriorities, TaskStatuses, todolistsApi, UpdateTaskType} from '../../api/todolists-api';
import {
    addTaskAC, addTodolistAC, updateTodolistTitleAC, removeTaskAC,
    removeTodolistAC, setTasksAC, setTodolistsAC, updateTaskAC, setAppErrorAC, setAppStatusAC
} from "./actions";
import {AppActionsType, AppRootStateType} from "../store/store";
import {ThunkAction} from "redux-thunk";


// thunks for todolist
export const fetchTodolistsTC = (): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await todolistsApi.getTodolists();
        dispatch(setTodolistsAC(res.data));
        dispatch(setAppStatusAC('succeeded'))

    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while fetching the data');
    }
};

export const removeTodolistTC = (todoListId: string): ThunkType => async (dispatch) => {
    try {
        await todolistsApi.removeTodolist(todoListId);
        dispatch(removeTodolistAC(todoListId));
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while removed the data');
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
            }
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while added the data');
    }
};

export const updateTodolistTitleTC = (id: string, title: string): ThunkType => async (dispatch) => {
    try {
        await todolistsApi.updateTodolist(id, title);
        dispatch(updateTodolistTitleAC(id, title));
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while updated the data');
    }
};


// thunks for task


export const fetchTasksTC = (todolistId: string): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await todolistsApi.getTasks(todolistId);
        dispatch(setTasksAC(res.data.items, todolistId));
        dispatch(setAppStatusAC('succeeded'))

        if (res.data.error !== null) {
            dispatch(setAppErrorAC(res.data.error))
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while fetching the data');
    }
};

export const removeTaskTC = (id: string, todoListId: string): ThunkType => async (dispatch) => {
    try {
        await todolistsApi.removeTask(id, todoListId);
        dispatch(removeTaskAC(id, todoListId));

    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while removed the data');
    }
};

export const addTaskTC = (title: string, todoListId: string): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await todolistsApi.addTask(title, todoListId);
        if (res.data.resultCode === 0) {
            dispatch(addTaskAC(res.data.data.item));
            dispatch(setAppStatusAC('succeeded'))

        } else {
            if (res.data.messages.length > 0) {
                dispatch(setAppErrorAC(res.data.messages[0])); // Исправление: использование [0] для получения первого сообщения об ошибке
            }
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while added the data');
    }
};


export const updateTaskTC = (
    taskId: string,
    domainModel: UpdateDomainTaskModelType,
    todolistId: string
): ThunkType => async (dispatch, getState) => {
    try {
        const task = getState().tasks[todolistId].find((t) => t.id === taskId);
        if (!task) {
            console.warn('task not found in the state');
            return;
        }

        const model: UpdateTaskType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        };

        await todolistsApi.updateTask(todolistId, taskId, model);
        dispatch(updateTaskAC(taskId, domainModel, todolistId));
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while update the data');
    }
};


// types
type ThunkType<ReturnType = void> = ThunkAction<
    void,
    AppRootStateType,
    unknown,
    AppActionsType
>;

export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
