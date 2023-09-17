import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { Todolist } from './Todolist';

export type FilterValuesType = 'all' | 'active' | 'completed' | 'remove all tasks';

type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type TodolistsType = {
    todolistId: string;
    title: string;
    filter: FilterValuesType;
};


function App() {
    let todolistID1 = uuidv4();
    let todolistID2 = uuidv4();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        { todolistId: todolistID1, title: 'What to learn', filter: 'all' },
        { todolistId: todolistID2, title: 'What to buy', filter: 'all' },
    ]);

    let [tasks, setTasks] = useState<{
        [key: string]: Array<TaskType>;
    }>({
        [todolistID1]: [
            { id: uuidv4(), title: 'HTML&CSS', isDone: true },
            { id: uuidv4(), title: 'JS', isDone: true },
            { id: uuidv4(), title: 'ReactJS', isDone: false },
        ],
        [todolistID2]: [
            { id: uuidv4(), title: 'Rest API', isDone: true },
            { id: uuidv4(), title: 'GraphQL', isDone: false },
            { id: uuidv4(), title: 'ReactJS', isDone: false },
            { id: uuidv4(), title: 'Rest API', isDone: false },
            { id: uuidv4(), title: 'GraphQL', isDone: false },
        ],
    });

    function removeTask(id: string, todolistId: string) {
        let updatedTasks = { ...tasks };
        updatedTasks[todolistId] = updatedTasks[todolistId].filter(
            (task) => task.id !== id
        );
        setTasks(updatedTasks);
    }

    function addTask(title: string, todolistId: string) {
        let task = { id: uuidv4(), title: title, isDone: false };
        let updatedTasks = { ...tasks };
        updatedTasks[todolistId] = [task, ...updatedTasks[todolistId]];
        setTasks(updatedTasks);
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        let updatedTasks = { ...tasks };
        let todolistTasks = updatedTasks[todolistId];
        let task = todolistTasks.find((task) => task.id === id);
        if (task) {
            task.isDone = isDone;
        }
        setTasks(updatedTasks);
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let updatedTodolists = todolists.map((todolist) => {
            if (todolist.todolistId === todolistId) {
                return { ...todolist, filter: value };
            }
            return todolist;
        });

        setTodolists(updatedTodolists);
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter((tl) => tl.todolistId !== todolistId));

        let updatedTasks = { ...tasks };
        delete updatedTasks[todolistId];
        setTasks(updatedTasks);
    };

    const removeAllTasks = (todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: []
        });
    };

    return (
        <div className="App">
            {todolists.map((todolist) => {
                let tasksForTodolist = tasks[todolist.todolistId];
                if (todolist.filter === 'active') {
                    tasksForTodolist = tasks[todolist.todolistId].filter((t) => !t.isDone);
                }
                if (todolist.filter === 'completed') {
                    tasksForTodolist = tasks[todolist.todolistId].filter((t) => t.isDone);
                }

                return (
                    <Todolist
                        key={todolist.todolistId}
                        id={todolist.todolistId}
                        title={todolist.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={todolist.filter}
                        removeTodolist={removeTodolist}
                        removeAllTasks={removeAllTasks}
                    />
                );
            })}
        </div>
    );
}

export default App;