import React, {ChangeEvent} from 'react';
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {Checkbox} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {AppRootStateType} from "../state/store";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../state/todolists-reducer";
import {EditableSpan} from "../components/EditableSpan";
import {AddItemForm} from "../components/AddItemForm";
import {TodolistType} from "../AppWithRedux";
import {ButtonContainer} from "../components/ButtonContainer";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}

export function TodolistWithRedux({todolist}: PropsType) {

    const {id, title, filter} = todolist

    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])

    const dispatch = useDispatch()

    const addTask = (title: string) => {
        dispatch(addTaskAC(title, id))
    }

    const removeTodolist = () => {
        const result = window.confirm("Вы уверены, что хотите удалить этот элемент?");
        if (result) {
            dispatch(removeTodolistAC(id));
        }
    };

    const changeTodolistTitle = (title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    }

    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(id, "all"))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(id, "active"))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(id, "completed"))


    if (filter === "active") {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone);
    }

    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete color='warning' style={{width: '30px', height: '30px'}}/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, id))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue, id))
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        dispatch(changeTaskTitleAC(t.id, newValue, id))
                    }

                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            color="success"
                            onChange={onChangeHandler}
                        />

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete color='warning'/>
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <ButtonContainer
                filter={filter}
                onClick={onAllClickHandler}
                color="inherit"
                variant={filter === 'all' ? 'outlined' : 'text'}
            >
                All
            </ButtonContainer>

            <ButtonContainer
                filter={filter}
                onClick={onActiveClickHandler}
                color="primary"
                variant={filter === 'active' ? 'outlined' : 'text'}
            >
                Active
            </ButtonContainer>

            <ButtonContainer
                filter={filter}
                onClick={onCompletedClickHandler}
                color="secondary"
                variant={filter === 'completed' ? 'outlined' : 'text'}
            >
                Completed
            </ButtonContainer>
        </div>
    </div>
}


