import React, {Reducer, useReducer} from 'react';
import './App.css';
import {v1} from 'uuid';
import {Container, Grid,  Paper} from "@mui/material";
import {Todolist} from "../components/Todolist";
import {
    ActionsTaskType,
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer, TaskStateType
} from "../state/tasks-reducer";
import {
    ActionsTodolistType, addTodolistAC,
    changeTodolistFilterAC, changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC, TodolistDomainType,
    todolistsReducer
} from "../state/todolists-reducer";
import {ButtonAppBar} from "../components/ButtonAppBar";
import {AddItemForm} from "../components/AddItemForm";
import {TaskPriorities, TaskStatuses} from "../api/todolists-api";


function AppWithReducer() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolists] = useReducer<Reducer<TodolistDomainType[], ActionsTodolistType>>(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0 },
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ])

    let [tasks, dispatchToTasks] = useReducer<Reducer<TaskStateType, ActionsTaskType>>(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, deadline: '', addedDate: '', startDate: '', description: '', order: 0, priority: TaskPriorities.Low, todoListId: 'todolistId1'},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, deadline: '', addedDate: '', startDate: '', description: '', order: 0, priority: TaskPriorities.Low, todoListId: 'todolistId1'}
        ],
        [todolistId2]: [
            {id: v1(), title: "Milk",  status: TaskStatuses.Completed, deadline: '', addedDate: '', startDate: '', description: '', order: 0, priority: TaskPriorities.Low, todoListId: 'todolistId2'},
            {id: v1(), title: "React Book",  status: TaskStatuses.Completed, deadline: '', addedDate: '', startDate: '', description: '', order: 0, priority: TaskPriorities.Low, todoListId: 'todolistId2'}
        ]
    });

    function removeTask(id: string, todolistId: string) {
        dispatchToTasks(removeTaskAC(id, todolistId));
    }

    function addTask(title: string, todolistId: string) {
        dispatchToTasks(addTaskAC(title, todolistId));
    }

    function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
        dispatchToTasks(changeTaskStatusAC(id, status, todolistId));
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        dispatchToTasks(changeTaskTitleAC(id, newTitle, todolistId));
    }

    function changeFilter(todolistId: string, filter: FilterValuesType) {
        dispatchToTodolists(changeTodolistFilterAC(todolistId, filter))

    }

    function removeTodolist(todolistId: string) {
        let action = removeTodolistAC(todolistId)
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }

    function changeTodolistTitle(todolistId: string, title: string) {
        dispatchToTodolists(changeTodolistTitleAC(todolistId, title))

    }

    function addTodolist(title: string) {
        let action = addTodolistAC(title)
        dispatchToTodolists(action)
        dispatchToTasks(action)

    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed );
                            }

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        key={tl.id}
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        filter={tl.filter}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducer;