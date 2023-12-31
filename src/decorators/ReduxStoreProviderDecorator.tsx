import React from 'react'
import {Provider} from "react-redux";
import {combineReducers, legacy_createStore} from "redux";
import {v1} from "uuid";
import {tasksReducer} from "../state/tasks-reducer";
import {todolistsReducer} from "../state/todolists-reducer";
import {AppRootStateType} from "../state/store";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", order: 0, addedDate: ""},
        {id: "todolistId2", title: "What to buy", filter: "all", order: 0, addedDate: ""}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS",
                status: TaskStatuses.Completed,
                description: "",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: "",
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            },
            {
                id: v1(), title: "JS",
                status: TaskStatuses.New,
                description: "",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: "",
                todoListId: "todolistId1",
                order: 0,
                addedDate: ''
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk",
                status: TaskStatuses.New,
                description: "",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: "",
                todoListId: "todolistId2",
                order: 0,
                addedDate: ''
            },
            {
                id: v1(), title: "React Book",
                status: TaskStatuses.Completed,
                description: "",
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: "",
                todoListId: "todolistId2",
                order: 0,
                addedDate: ''
            }
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
