import React, {memo, useCallback} from 'react'
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "./AddItemForm";
import {FilterValuesType} from "../AppWithRedux";
import {Task} from "./Task";
import {IconButton} from "@mui/material";
import {ButtonContainer} from "./ButtonContainer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType

}

export const Todolist = memo(function (props: PropsType) {

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
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
        tasksForTodolist = props.tasks.filter(t => !t.isDone)
    }
    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(t => t.isDone)
    }

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
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



