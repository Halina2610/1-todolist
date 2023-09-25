import React, { ChangeEvent } from 'react';
import { FilterValuesType } from './App';
import { AddItemForm } from "./components/AddItemForm";
import { EditableSpan } from "./components/EditableSpan";
import {Button, Checkbox, Fab, IconButton} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { Add as AddIcon } from "@mui/icons-material";

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: string, todolistId: string) => void;
    changeFilter: (value: FilterValuesType, todolistId: string) => void;
    addTask: (title: string, todolistId: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void;
    filter: FilterValuesType;
    id: string;
    removeTodolist: (todolistId: string) => void;
    removeAllTasks: (todolistId: string) => void;
    changeTodolistTitleHandler: (newTitle: string, todolistId: string) => void;
};

export const Todolist: React.FC<PropsType> = ({
                                                  title: todolistTitle,
                                                  tasks,
                                                  removeTask,
                                                  changeFilter,
                                                  addTask,
                                                  changeTaskStatus,
                                                  changeTaskTitle,
                                                  filter,
                                                  id,
                                                  removeTodolist,
                                                  changeTodolistTitleHandler,
                                              }) => {
    const onAllClickHandler = () => changeFilter('all', id);
    const onActiveClickHandler = () => changeFilter('active', id);
    const onCompletedClickHandler = () => changeFilter('completed', id);

    const removeTaskHandler = (taskId: string) => {
        removeTask(taskId, id);
    };

    const changeTodolistTitle = (newTitle: string) => {
        changeTodolistTitleHandler(newTitle, id);
    };

    const changeTaskStatusHandler = (taskId: string, isDone: boolean) => {
        changeTaskStatus(taskId, isDone, id);
    };

    const addItem = (title: string) => {
        addTask(title, id);
    };

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h3>
                    <EditableSpan title={todolistTitle} onChange={changeTodolistTitle} />
                </h3>
                <IconButton color={"warning"} onClick={() => removeTodolist(id)} aria-label="delete">
                    <Delete />
                </IconButton>

            </div>
            <AddItemForm addItem={addItem} />

            <div>
                {tasks.map((t) => {
                    const onClickHandler = () => removeTaskHandler(t.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatusHandler(t.id, e.currentTarget.checked);
                    };
                    const onChangeHandlerSpan = (newValue: string) => {
                        changeTaskTitle(t.id, newValue, id);
                    };

                    return (
                        <div key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <Checkbox  onChange={onChangeHandler} checked={t.isDone} size={"small"} defaultChecked color="secondary" />
                            <EditableSpan title={t.title} onChange={onChangeHandlerSpan} />
                            <IconButton onClick={onClickHandler} aria-label="delete" size="small">
                                <Delete fontSize="inherit" color="info" />
                            </IconButton>
                        </div>
                    );
                })}
            </div>
            <div>
                <Button
                    variant={filter === 'all' ? 'contained' : 'outlined'}
                    color="info"
                    onClick={onAllClickHandler}
                >
                    All
                </Button>
                <Button
                    variant={filter === 'active' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={onActiveClickHandler}
                >
                    Active
                </Button>
                <Button
                    variant={filter === 'completed' ? 'contained' : 'outlined'}
                    color="secondary"
                    onClick={onCompletedClickHandler}
                >
                    Completed
                </Button>
            </div>
        </div>
    );
};