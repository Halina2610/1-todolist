import {TaskPriorities, TaskStatuses, todolistsApi, UpdateTaskType} from '../../api/todolists-api';
import {
    addTaskAC, removeTaskAC,
    setTasksAC, updateTaskAC,
} from "../actions/actionsTasks";
import {ThunkType} from "../store/store";
import {setAppErrorAC, setAppStatusAC} from "../actions/actionsApp";

export const fetchTasksTC = (todolistId: string): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await todolistsApi.getTasks(todolistId);
        dispatch(setTasksAC(res.data.items, todolistId));
        dispatch(setAppStatusAC('succeeded'))

        if (res.data.error !== null) {
            dispatch(setAppErrorAC(res.data.error))
            console.error(res.data.totalCount)
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while fetching the task');
    }
};

export const removeTaskTC = (id: string, todoListId: string): ThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await todolistsApi.removeTask(id, todoListId);
        dispatch(removeTaskAC(id, todoListId));
        dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while removed the task');
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
            } else {
                dispatch(setAppErrorAC('Some error occurred'))
                console.error('this addTaskTC')

            }
        }
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while added the task');
    }
};


export const updateTaskTC = (
    taskId: string,
    domainModel: UpdateDomainTaskModelType,
    todolistId: string
): ThunkType => async (dispatch, getState) => {

    dispatch(setAppStatusAC('loading'))
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
        dispatch(setAppStatusAC('succeeded'))
    } catch (error) {
        console.error('Error:', error);
        throw new Error('An error occurred while update the task');
    }
};


// types
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}
