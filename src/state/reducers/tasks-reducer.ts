import {TaskType} from "../../api/todolists-api";
import {
    addTaskAC,
    addTodolistAC,
    removeTaskAC,
    removeTodolistAC,
    setTasksAC,
    setTodolistsAC,
    updateTaskAC,
} from "../actionsAndThunck/actions";

const initialState: TaskStateType = {};

export const tasksReducer = (
    state: TaskStateType = initialState,
    action: ActionsTaskType
): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todoListId]: state[action.todoListId].filter(t => t.id !== action.taskId),
            };
        }
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]],};
        }
        case 'UPDATE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t),
            };
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolist.id]: [],};
        }
        case 'REMOVE-TODOLIST': {
            const {[action.id]: removed, ...copyState} = state;
            return copyState;
        }
        case 'SET-TODOLISTS': {
            const copyState: TaskStateType = {};
            action.todolists.forEach(tl => {copyState[tl.id] = [];});
            return copyState;
        }
        case 'SET-TASKS': {
            return {...state, [action.todoListId]: action.tasks};
        }
        default:
            return state;
    }
};

export type ActionsTaskType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof setTodolistsAC>
    | ReturnType<typeof setTasksAC>;

export type TaskStateType = {
    [key: string]: TaskType[];
};