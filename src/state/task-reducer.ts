import {FilterValuesType, TasksStateType, TodolistType} from '../App';
import {v1} from 'uuid';
import {TaskType} from "../components/Todolist";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>

export type AddTaskActionType = ReturnType<typeof addTaskAC>

export  type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>

export  type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>


export type ActionTasksType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType | AddTodolistActionType
| RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionTasksType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            };
        }

        case 'ADD-TASK': {
            const { title, todolistId } = action;
            const newTask: TaskType = {
                id: v1(),
                title,
                isDone: false,
            };
            const updatedTasks = { ...state };
            updatedTasks[todolistId] = [newTask, ...updatedTasks[todolistId]];
            return updatedTasks;
        }

        case 'CHANGE-TASK-STATUS': {
            const { taskId, todolistId } = action;
            const updatedTasks = { ...state };
            const todolistTasks = updatedTasks[todolistId];
            const task = todolistTasks.find((task) => task.id === taskId);
            if (task) {
                task.isDone = !task.isDone;
            }
            return updatedTasks;
           /* return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map((task) => task.id === taskId)
            }*/

        }
            case 'CHANGE-TASK-TItLE': {
                return {
                    ...state,
                    [action.todolistId]: state[action.todolistId]
                        .map((task) => task.id === action.taskId ? {...task, title: action.title} : task)
                }
            }

        case 'ADD-TODOLIST':{
            return {
                ...state,
                [action.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
        const { [action.id]: deletedTodolist, ...updatedState } = state;
            return updatedState;
//или так
            /*let copyState = {...state}
            delete copyState[action.id]
            return copyState*/
        }

        default:
            throw new Error("I don't understand this type");
    }
};
export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}
export const addTaskAC = (title: string, todolistId: string)=> {
    return { type: "ADD-TASK", title, todolistId } as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return { type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId} as const
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return { type: 'CHANGE-TASK-TItLE', taskId, title, todolistId} as const
}

