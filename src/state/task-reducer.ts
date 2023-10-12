import { v4 as uuidv4 } from 'uuid';

type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

export type TasksStateType = {
    [key: string]: TaskType[];
};

type RemoveTaskAction = {
    type: 'REMOVE-TASK';
    taskId: string;
    todolistId: string;
};

 type AddTaskAction = {
    type: 'ADD-TASK';
    title: string;
    todolistId: string;
};

export type AddTasksAction = {
    type: 'ADD-TASKS';
    todolistId: string;
    tasks: Array<TaskType>;
};

type ChangeTaskStatusAction = {
    type: 'CHANGE-TASK-STATUS';
    taskId: string;
    isDone: boolean;
    todolistId: string;
};

type ChangeTaskTitleAction = {
    type: 'CHANGE-TASK-TITLE';
    taskId: string;
    newTitle: string;
    todolistId: string;
};

type RemoveAllTasksAction = {
    type: 'REMOVE-ALL-TASKS';
    todolistId: string;
};

export type TasksActionType =
    | RemoveTaskAction
    | AddTaskAction
    | ChangeTaskStatusAction
    | ChangeTaskTitleAction
    | AddTasksAction
    | RemoveAllTasksAction;

export const tasksReducer = (state: TasksStateType, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const { taskId, todolistId } = action;
            const updatedTasks = { ...state };
            updatedTasks[todolistId] = updatedTasks[todolistId].filter((task) => task.id !== taskId);
            return updatedTasks;
        }
        case 'ADD-TASK': {
            const { title, todolistId } = action;
            const newTask: TaskType = {
                id: uuidv4(),
                title,
                isDone: false,
            };
            const updatedTasks = { ...state };
            updatedTasks[todolistId] = [newTask, ...updatedTasks[todolistId]];
            return updatedTasks;
        }

        case 'CHANGE-TASK-STATUS': {
            const { taskId, isDone, todolistId } = action;
            const updatedTasks = { ...state };
            const todolistTasks = updatedTasks[todolistId];
            const task = todolistTasks.find((task) => task.id === taskId);
            if (task) {
                task.isDone = isDone;
            }
            return updatedTasks;
        }
        case 'CHANGE-TASK-TITLE': {
            const { taskId, newTitle, todolistId } = action;
            const updatedTasks = { ...state };
            const todolistTasks = updatedTasks[todolistId];
            const task = todolistTasks.find((task) => task.id === taskId);
            if (task) {
                task.title = newTitle;
            }
            return updatedTasks;
        }
        case 'REMOVE-ALL-TASKS': {
            const { todolistId } = action;
            return {
                ...state,
                [todolistId]: [],
            };
        }
        default:
            return state;
    }
};

// Action creators
export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskAction => ({
    type: 'REMOVE-TASK',
    taskId,
    todolistId,
});

export const addTaskAC = (title: string, todolistId: string): AddTaskAction => ({
    type: 'ADD-TASK',
    title,
    todolistId,
});

export const changeTaskStatusAC = (
    taskId: string,
    isDone: boolean,
    todolistId: string
): ChangeTaskStatusAction => ({
    type: 'CHANGE-TASK-STATUS',
    taskId,
    isDone,
    todolistId,
});

export const changeTaskTitleAC = (
    taskId: string,
    newTitle: string,
    todolistId: string
): ChangeTaskTitleAction => ({
    type: 'CHANGE-TASK-TITLE',
    taskId,
    newTitle,
    todolistId,
});

export const removeAllTasksAC = (todolistId: string): RemoveAllTasksAction => ({
    type: 'REMOVE-ALL-TASKS',
    todolistId,
});