import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'bdcfda08-91c6-49eb-9714-5d59d1951986',
    },
});

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
    description: string
    title: string
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
    description: string | null
    status: 0 | 1 | 2 | 3
    priority: number
    startDate: string | null
    deadline: string | null
}

type TasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

export const todolistsApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists');
    },

    createtTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType }>>
        ('todo-lists', {title});
    },

    updateTodolist(title: string, todoListId: string) {
        return instance.put<ResponseType>
        (`todo-lists/${todoListId}`, {title});
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>
        (`todo-lists/${todolistId}`);
    },


    getTasks(todoListId: string) {
        return instance.get<TasksResponseType>(`todo-lists/${todoListId}/tasks`);
    },

    createTask(title: string, todoListId: string) {
        return instance.post<ResponseType<{item: TaskType}>>
        (`todo-lists/${todoListId}/tasks`, {title});
    },

    updateTasks(
        todoListId: string,
        taskId: string,
        title: string,
        description: string,
        status: number,
        priority: number,
        startDate: string,
        deadline: string
    ) {
        return instance.put<UpdateTaskType>
        (`todo-lists/${todoListId}/tasks/${taskId}`,
            {title, description, status, priority, startDate, deadline});
    },

    deleteTask
    (taskId: string, todolistId: string) {
        return instance.delete<ResponseType>
        (`todo-lists/${todolistId}/tasks/${taskId}`);
    }

}
