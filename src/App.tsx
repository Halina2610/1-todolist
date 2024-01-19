import React, {memo, useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from './components/AddItemForm';
import {FilterValuesType, TodolistDomainType} from './state/reducers/todolists-reducer'
import {TaskStateType} from './state/reducers/tasks-reducer';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from './state/store/store';
import {Container, Grid, Paper} from "@mui/material";
import {Header} from "./components/Header";
import {Todolist} from "./components/Todolist";
import {TaskStatuses} from "./api/todolists-api";
import {addTaskTC, fetchTodolistsTC, removeTaskTC} from "./state/actions/thunks";
import {
    addTodolistAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/actions/actions";


export const App = memo(() => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])

    const removeTask = useCallback(function (id: string, todoListId: string) {
        const thunk = removeTaskTC(id, todoListId)
        dispatch(thunk)
    }, [])



    const addTask = useCallback((title: string, todoListId: string) => {

        dispatch(addTaskTC( title, todoListId));
    }, [])

    const changeStatus = useCallback((id: string, status: TaskStatuses, todoListId: string) => {
        const action = changeTaskStatusAC(id, status, todoListId);
        dispatch(action);
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todoListId: string) => {
        const action = changeTaskTitleAC(id, newTitle, todoListId);
        dispatch(action);
    }, [dispatch])

    const changeFilter = useCallback((todoListId: string, filter: FilterValuesType) => {
        const action = changeTodolistFilterAC(todoListId, filter);
        dispatch(action);
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        const action = removeTodolistAC(id);
        dispatch(action);
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        const action = changeTodolistTitleAC(id, title);
        dispatch(action);
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch])

    return (
        <div className="App">
            <Header/>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            return <Grid item key={tl.id}>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        id={tl.id}
                                        title={tl.title}
                                        tasks={tasks[tl.id]}
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
})