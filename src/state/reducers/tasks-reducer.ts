import {TaskStatuses, TaskType} from "../../api/todolists-api";
import {
    AddTaskActionType, AddTodolistActionType,
    RemoveTaskActionType, RemoveTodolistActionType, SetTasksActionType, SetTodolistsActionType, updateTaskAC
} from "../actions/actions";


export type ActionsTaskType = RemoveTaskActionType
    | AddTaskActionType
    | ReturnType<typeof updateTaskAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

const initialState: TaskStateType = {}

export const tasksReducer = (state: TaskStateType = initialState, action: ActionsTaskType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todoListId];
            const newTasks = tasks.filter(t => t.id !== action.taskId);
            stateCopy[action.todoListId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            debugger
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            debugger

            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'UPDATE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case 'SET-TODOLISTS': {
            const copyState = {...state};
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState;

        }
        case 'SET-TASKS': {
            const copyState = {...state};
            copyState[action.todoListId] = action.tasks
            return copyState
        }

        default:
            return state;
    }
}

