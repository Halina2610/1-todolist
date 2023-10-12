import React, {useReducer} from 'react';
import {v4 as uuidv4} from 'uuid';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./components/AddItemForm";
import {ButtonAppBar} from "./components/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {
    AddTodolistAC,
    ChangeTodolistFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {
    addTaskAC, AddTasksAction, changeTaskStatusAC, changeTaskTitleAC, removeAllTasksAC,
    removeTaskAC,
    tasksReducer
} from "./state/task-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed' | 'remove all tasks';

export type TodolistType = {
    todolistId: string;
    title: string;
    filter: FilterValuesType;
};

function AppWithReducers() {
    let todolistID1 = uuidv4();
    let todolistID2 = uuidv4();

    const [todolists, dispatchTodolistsReducer] = useReducer(todolistsReducer, [
        {todolistId: todolistID1, title: 'What to learn', filter: 'all'},
        {todolistId: todolistID2, title: 'What to buy', filter: 'all'},
    ]);

    const [tasks, dispatchTasksReducer] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: uuidv4(), title: 'HTML&CSS', isDone: true},
            {id: uuidv4(), title: 'JS', isDone: true},
            {id: uuidv4(), title: 'ReactJS', isDone: false},
            {id: uuidv4(), title: 'Rest API', isDone: false},
            {id: uuidv4(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: uuidv4(), title: 'Book', isDone: false},
            {id: uuidv4(), title: 'Coffee', isDone: true},
        ],
    });

    function removeTask(id: string, todolistId: string) {
        let action = removeTaskAC(id, todolistId)
        dispatchTasksReducer(action);
    }

    function addTask(title: string, todolistId: string) {
        dispatchTasksReducer(addTaskAC(title, todolistId));
    }

    function changeStatus(id: string, isDone: boolean, todolistId: string) {
        dispatchTasksReducer(changeTaskStatusAC(id, isDone, todolistId));
    }

    function changeFilter(filter: FilterValuesType, todolistId: string) {
        dispatchTodolistsReducer(ChangeTodolistFilterAC(filter, todolistId));
    }

    const removeTodolist = (todolistId: string) => {
        dispatchTodolistsReducer(RemoveTodolistAC(todolistId));
    };

    const removeAllTasks = (todolistId: string) => {
        dispatchTasksReducer(removeAllTasksAC(todolistId));
    };

    const addTodolist = (title: string) => {
        dispatchTodolistsReducer(AddTodolistAC(title));

        dispatchTasksReducer({
            type: 'ADD-TASKS',
            todolistId: todolistID1,
            tasks: []
        } as AddTasksAction);

        dispatchTasksReducer({
            type: 'ADD-TASKS',
            todolistId: todolistID2,
            tasks: []
        } as AddTasksAction);
    };


    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        dispatchTasksReducer(changeTaskTitleAC(id, newTitle, todolistId))
    };

    const changeTodolistTitleHandler = (todolistId: string, newTitle: string) => {
        dispatchTodolistsReducer(ChangeTodolistTitleAC(todolistId, newTitle));
    };

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map((todolist) => {
                        let tasksForTodolist = tasks[todolist.todolistId];
                        if (todolist.filter === 'active') {
                            tasksForTodolist = tasks[todolist.todolistId].filter((t) => !t.isDone);
                        }
                        if (todolist.filter === 'completed') {
                            tasksForTodolist = tasks[todolist.todolistId].filter((t) => t.isDone);
                        }

                        return (
                            <Grid item key={todolist.todolistId}>
                                <Paper style={{padding: '10px'}}>
                                    <Todolist
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
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitleHandler={changeTodolistTitleHandler}
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;