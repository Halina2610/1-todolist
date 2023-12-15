import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': 'bdcfda08-91c6-49eb-9714-5d59d1951986',
    },
});

type TodolistsType = {
    id: string,
    title: string,
    addedDate: string,
    "order": string
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
    fieldsErrors?: Array<string>
}

export type TaskType = {
    description: string
    title: string
    status: number
    priority: number
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
        return instance.get<TodolistsType[]>('todo-lists');
    },

    createtTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistsType }>>
        ('todo-lists', {title});
    },

    updateTodolist(title: string, todolistId: string) {
        return instance.put<ResponseType>
        (`todo-lists/${todolistId}`, {title});
    },

    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>
        (`todo-lists/${todolistId}`);
    },


    getTasks(todolistId: string) {
        return instance.get<TasksResponseType>(`todo-lists/${todolistId}/tasks`);
    },

    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<TaskType>>
        (`todo-lists/${todolistId}/tasks`, {title});
    },

    updateTasks(
        todolistId: string,
        taskId: string,
        title: string,
        description: string,
        status: number,
        priority: number,
        startDate: string,
        deadline: string
    ) {
        return instance.put<UpdateTaskType>
        (`todo-lists/${todolistId}/tasks/${taskId}`,
            {title, description, status, priority, startDate, deadline});
    },

    deleteTask
    (todolistId: string, taskId: string) {
        return instance.delete<ResponseType>
        (`todo-lists/${todolistId}/tasks/${taskId}`);
    }
    ,

}
/*
import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'bdcfda08-91c6-49eb-9714-5d59d1951986',
    },
};

export const todolistsApi = {
    getTodolists() {

        const getPromise = axios
            .get('https://social-network.samuraijs.com/api/1.1/todo-lists', settings)
        return getPromise
    },

    postTodolist(title: string) {
     let postPromise = axios
            .post(
                'https://social-network.samuraijs.com/api/1.1/todo-lists',
                { title: title },
                settings
            )
        return postPromise
    },

    putTodolist(title: string, todolistId: string) {
        const putPromise = axios
            .put(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
                { title: title },
                settings
            )
        return putPromise

    },

    deleteTodolist(todolistId: string) {
        const deleteedPromise = axios
            .delete(
                `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
                settings
            )
        return deleteedPromise

    }
}*/
