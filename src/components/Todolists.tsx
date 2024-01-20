import React, {memo, useCallback, useEffect} from 'react';
import {FilterValuesType, TodolistDomainType} from '../state/reducers/todolists-reducer'
import {TaskStateType} from '../state/reducers/tasks-reducer';
import {useSelector} from 'react-redux';
import {AppRootStateType, useAppDispatch} from '../state/store/store';
import {Container, Grid, Paper} from "@mui/material";
import {
    addTaskTC,
    addTodolistTC,
    updateTodolistTitleTC,
    fetchTodolistsTC,
    removeTaskTC,
    removeTodolistTC, updateTaskTC
} from "../state/actions/thunks";

import {Todolist} from "./Todolist";
import {TaskStatuses} from "../api/todolists-api";
import {changeTodolistFilterAC} from "../state/actions/actions";
import {AddItemForm} from "./AddItemForm";


export const Todolists = memo(() => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [dispatch])

    const removeTodolist = useCallback((todoListId: string) => {
        dispatch(removeTodolistTC(todoListId))
    }, [dispatch])

    const removeTask = useCallback(function (id: string, todoListId: string) {
        const thunk = removeTaskTC(id, todoListId)
        dispatch(thunk)
    }, [])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch])

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskTC(title, todoListId));
    }, [])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(updateTodolistTitleTC(id, title));
    }, [dispatch])

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        const thunk = updateTaskTC(id, {status}, todolistId)
        dispatch(thunk)
    }, [])

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        const thunk = updateTaskTC(id, {title: newTitle}, todolistId)
        dispatch(thunk)
    }, [])

    const changeFilter = useCallback((todoListId: string, filter: FilterValuesType) => {
        const action = changeTodolistFilterAC(todoListId, filter);
        dispatch(action);
    }, [dispatch])


    return (
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

    );
})