import {useState} from "react";
import {v1} from "uuid";
import {todolistId1, todolistId2} from "../state/utils/id-utils";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";
import {TaskStateType} from "../state/reducers/tasks-reducer";

export function useTasks() {
    let [tasks, setTasks] = useState<TaskStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, deadline: '', addedDate: '',
                startDate: '', description: '', order: 0, priority: TaskPriorities.Low, todoListId: "todolistId1"},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, deadline: '', addedDate: '',
                startDate: '', description: '', order: 0, priority: TaskPriorities.Low, todoListId: "todolistId1"}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed, deadline: '', addedDate: '',
                startDate: '', description: '', order: 0, priority: TaskPriorities.Low, todoListId: "todolistId2"},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, deadline: '', addedDate: '',
                startDate: '', description: '', order: 0, priority: TaskPriorities.Low, todoListId: "todolistId2"}
        ]
    });

    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(t => t.id != id);
        setTasks({...tasks});
    }

    function addTask(title: string, todoListId: string) {
        let task = {id: v1(), title: title, status: TaskStatuses.New, deadline: '', addedDate: '', startDate: '', description: '', order: 0, priority: TaskPriorities.Low, todoListId: v1()};
        let todolistTasks = tasks[todoListId];
        tasks[todoListId] = [task, ...todolistTasks];
        setTasks({...tasks});
    }

    function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            status === TaskStatuses.Completed;
            setTasks({...tasks});
        }
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.title = newTitle;
            setTasks({...tasks});
        }
    }

    function completelyRemoveTaskForTodolist(id: string) {
        delete tasks[id];
        setTasks({...tasks});
    }

    function addedTodolist(newTodolistId: string) {
        setTasks({
            ...tasks,
            [newTodolistId]: []
        })
    }

    return {
        tasks,
        addTask,
        removeTask,
        changeStatus,
        changeTaskTitle,
        completelyRemoveTaskForTodolist,
        addedTodolist,
    }
}