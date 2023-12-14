import {useState} from "react";
import {v1} from "uuid";
import {TasksStateType} from "../App";
import {todolistId1, todolistId2} from "../../utils/id-utils";

export default function useTasks() {
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", isDone: true},
            {id: v1(), title: "React Book", isDone: true}
        ]
    });

    function removeTask(id: string, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = todolistTasks.filter(t => t.id != id);
        setTasks({...tasks});
    }

    function addTask(title: string, todolistId: string) {
        let task = {id: v1(), title: title, isDone: false};
        let todolistTasks = tasks[todolistId];
        tasks[todolistId] = [task, ...todolistTasks];
        setTasks({...tasks});
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let todolistTasks = tasks[todolistId];
        let task = todolistTasks.find(t => t.id === id);
        if (task) {
            task.isDone = isDone;
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