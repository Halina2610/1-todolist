import {TaskPriorities, TaskStatuses, todolistsApi, UpdateTaskType} from '../../api/todolists-api';
import {
    addTaskAC,
    addTodolistAC,
    updateTodolistTitleAC,
    removeTaskAC,
    removeTodolistAC,
    setTasksAC,
    setTodolistsAC, updateTaskAC
} from "./actions";
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

export const removeTodolistTC = (todoListId: string): ThunkType => {
    return async (dispatch) => {
        try {
            await todolistsApi.removeTodolist(todoListId)
            dispatch(removeTodolistAC(todoListId))
        } catch (error) {
            console.log(error)
        }
    }
}

export const addTodolistTC = (title: string): ThunkType => {
    return async (dispatch) => {
        try {
            const res = await todolistsApi.addTodolist(title)
            dispatch(addTodolistAC(res.data.data.item))
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateTodolistTitleTC = (id: string, title: string): ThunkType => {
    return async (dispatch) => {
        try {
            await todolistsApi.updateTodolist(id, title)
            dispatch(updateTodolistTitleAC(id, title))

        } catch (error) {
            console.log(error)
        }
    }
}


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
            await todolistsApi.removeTask(id, todoListId)
            dispatch(removeTaskAC(id, todoListId))
        } catch (error) {
            console.log(error)
        }
    }
}

export const addTaskTC = (title: string, todoListId: string): ThunkType => {
    return async (dispatch) => {
        try {
            const res = await todolistsApi.addTask(title, todoListId);
            dispatch(addTaskAC(res.data.data.item));

        } catch (error) {
            console.log(error);
        }
    };
};

export const updateTaskTC = (taskId: string, domainModel: UpdateDomainTaskModelType, todolistId: string): ThunkType =>
    (dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found in the state");
            console.warn('task not found in the state')
            return
        }

        const apiModel: UpdateTaskType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        todolistsApi.updateTask(todolistId, taskId, apiModel)
            .then(res => {
                const action = updateTaskAC(taskId, domainModel, todolistId)
                dispatch(action)
            })
    }

// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
