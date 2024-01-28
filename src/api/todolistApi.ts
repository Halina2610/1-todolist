import axios, { AxiosResponse } from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'bdcfda08-91c6-49eb-9714-5d59d1951986',
    },
});

export const todolistApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');
    },

    addTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType }>>
        ('todo-lists', {title});
    },

    updateTodolist(id: string, title: string) {
        return instance.put<TodolistType[]>
        (`todo-lists/${id}`, {title});
    },

    removeTodolist(todolistId: string) {
        return instance.delete<ResponseType>
        (`todo-lists/${todolistId}`);
    },


    getTasks(todoListId: string) {
        return instance.get<TasksResponseType>(`todo-lists/${todoListId}/tasks`);
    },

    addTask(title: string, todoListId: string) {
        return instance.post<ResponseType<{item: TaskType}>>
        (`todo-lists/${todoListId}/tasks`, {title});
    },

    updateTask(todolistId: string, taskId: string, model: UpdateTaskType) {
        return instance.put<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, UpdateTaskType>
        (`todo-lists/${todolistId}/tasks/${taskId}`, model);
    },

    removeTask
    (taskId: string, todolistId: string) {
        return instance.delete<ResponseType>
        (`todo-lists/${todolistId}/tasks/${taskId}`);
    }

}



export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}

export enum TaskStatuses {
    New ,
    InProgress = 1,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    later
}

export type TaskType = {
    description: string,
    title: string
    completed?: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type UpdateTaskType = {
    title: string
    description: string
    status: TaskStatuses
    priority: number
    startDate: string
    deadline: string
}

type TasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}


export type LoginParamsType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: string
}