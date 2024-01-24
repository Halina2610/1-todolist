import React, {memo, useCallback, useEffect} from 'react'
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "../../../components/editableSpan/EditableSpan";
import {AddItemForm} from "../../../components/addItemForm/AddItemForm";
import {Task} from "./Task";
import {IconButton} from "@mui/material";
import {ButtonContainer} from "../../../components/buttons/ButtonContainer";
import {TaskStatuses, TaskType} from "../../../api/todolists-api";
import {FilterValuesType} from "../../../state/reducers/todolists-reducer";
import {fetchTasksTC} from "../../../state/thunks/thunksTask";
import {useAppDispatch, useAppSelector} from "../../../state/store/store";
import {RequestStatusType} from "../../../state/reducers/app-reducer";


type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    demo?: boolean
}

export const Todolist = memo(function ({demo = false,...props}: PropsType) {
    const dispatch = useAppDispatch()
    const entityStatus = useAppSelector<RequestStatusType>(state => state.app.status)

    useEffect(() => {
        if (demo) {
            return
        }
            dispatch(fetchTasksTC(props.id))
    }, [dispatch, props.id, demo]);

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const removeTodolist = () => props.removeTodolist(props.id)

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.id, props.changeTodolistTitle])


    const onAllClickHandler = useCallback(() => props.changeFilter(props.id, 'all'),
        [props.changeFilter, props.id])

    const onActiveClickHandler = useCallback(() => props.changeFilter(props.id, 'active'),
        [props.changeFilter, props.id])

    const onCompletedClickHandler = useCallback(() => props.changeFilter(props.id, 'completed'),
        [props.changeFilter, props.id])


    let tasksForTodolist = props.tasks

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }

    return <div style={{minHeight: '300px', padding: '50px'}}>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist} disabled={entityStatus === "loading"} >
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} entityStatus={entityStatus}/>
        <div>
            {
                tasksForTodolist.map(t => <Task
                    task={t}
                    changeTaskStatus={props.changeTaskStatus}
                    changeTaskTitle={props.changeTaskTitle}
                    removeTask={props.removeTask}
                    todolistId={props.id}
                    key={t.id}
                />)
            }
        </div>
        <div style={{paddingTop: '10px'}}>
            <ButtonContainer
                filter={props.filter}
                onClick={onAllClickHandler}
                color="inherit"
                variant={props.filter === 'all' ? 'outlined' : 'text'}
            >
                All
            </ButtonContainer>

            <ButtonContainer
                filter={props.filter}
                onClick={onActiveClickHandler}
                color="primary"
                variant={props.filter === 'active' ? 'outlined' : 'text'}
            >
                Active
            </ButtonContainer>

            <ButtonContainer
                filter={props.filter}
                onClick={onCompletedClickHandler}
                color="secondary"
                variant={props.filter === 'completed' ? 'outlined' : 'text'}
            >
                Completed
            </ButtonContainer>
        </div>
    </div>
})



