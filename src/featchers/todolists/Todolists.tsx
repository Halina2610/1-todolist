import React, {memo, useCallback, useEffect} from 'react';
import {FilterValuesType, TodolistDomainType} from '../../state/reducers/todolists-reducer'
import {TaskStateType} from '../../state/reducers/tasks-reducer';
import {useAppDispatch, useAppSelector} from '../../state/store/store';
import {Container, Grid, Paper} from "@mui/material";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../../state/thunks/thunksTask";
import {Todolist} from "./todolist/Todolist";
import {TaskStatuses} from "../../api/todolistApi";
import {AddItemForm} from "../../components/addItemForm/AddItemForm";
import {addTodolistTC, fetchTodolistsTC, removeTodolistTC, updateTodolistTitleTC} from "../../state/thunks/thunkTodolist";
import {changeTodolistFilterAC} from "../../state/actions/actionsTodolists";
import {ErrorSnackbar} from "../../components/ErrorSnackbar/ErrorSnackbar";
import {useNavigate} from "react-router-dom";


export const Todolists = memo(() => {

    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useAppSelector<TaskStateType>(state => state.tasks)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            dispatch(fetchTodolistsTC())
        }
    }, [isLoggedIn, navigate]);


    const removeTodolist = useCallback((todoListId: string) => {
        dispatch(removeTodolistTC(todoListId))
    }, [dispatch])

    const removeTask = useCallback(function (id: string, todoListId: string) {
        dispatch(removeTaskTC(id, todoListId))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [dispatch])

    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskTC(title, todoListId));
    }, [dispatch])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(updateTodolistTitleTC(id, title));
    }, [dispatch])

    const changeStatus = useCallback(function (id: string, status: TaskStatuses, todolistId: string) {
        dispatch(updateTaskTC(id, {status}, todolistId))
    }, [dispatch])

    const changeTaskTitle = useCallback(function (id: string, newTitle: string, todolistId: string) {
        dispatch(updateTaskTC(id, {title: newTitle}, todolistId))
    }, [dispatch])

    const changeFilter = useCallback((todoListId: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(todoListId, filter));
    }, [dispatch])


    return (
        <Container fixed>
            <Grid container style={{padding: "10px", margin: "50px 0"}}>
                <AddItemForm addItem={addTodolist} />
            </Grid>
            <Grid  container spacing={3}>
                {
                    todolists.map(tl => {
                        return <Grid item key={tl.id}>
                            <Paper style={{padding: "10px"}}>
                                <Todolist
                                   todolist={tl}
                                    tasks={tasks[tl.id]}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    changeTaskStatus={changeStatus}
                                    removeTodolist={removeTodolist}
                                    changeTaskTitle={changeTaskTitle}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
            <ErrorSnackbar />
        </Container>

    );
})