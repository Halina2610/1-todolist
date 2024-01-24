import React, {memo, useCallback, useEffect} from 'react';
import {FilterValuesType, TodolistDomainType} from '../../state/reducers/todolists-reducer'
import {TaskStateType} from '../../state/reducers/tasks-reducer';
import {useAppDispatch, useAppSelector} from '../../state/store/store';
import {Container, Grid, Paper} from "@mui/material";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../../state/thunks/thunksTask";
import {Todolist} from "./todolist/Todolist";
import {TaskStatuses} from "../../api/todolists-api";
import {AddItemForm} from "../../components/addItemForm/AddItemForm";
import {addTodolistTC, fetchTodolistsTC, removeTodolistTC, updateTodolistTitleTC} from "../../state/thunks/thunkTodolist";
import {changeTodolistFilterAC} from "../../state/actions/actionsTodolists";
import {RequestStatusType} from "../../state/reducers/app-reducer";

export const Todolists = memo(() => {

    const todolists = useAppSelector<Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useAppSelector<TaskStateType>(state => state.tasks)
    const entityStatus = useAppSelector<RequestStatusType>(state => state.app.status)
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
            <Grid container style={{padding: "20px", margin: "50px 0"}}>
                <AddItemForm addItem={addTodolist} entityStatus={entityStatus}/>
            </Grid>
            <Grid  container spacing={3}>
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
                                    entityStatus={tl.entityStatus}
                                />
                            </Paper>
                        </Grid>
                    })
                }
            </Grid>
        </Container>

    );
})