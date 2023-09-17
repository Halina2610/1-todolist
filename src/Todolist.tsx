import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { FilterValuesType } from './App';

type TaskType = {
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
    filter: FilterValuesType;
    id: string;
    removeTodolist: (todolistId: string) => void;
    removeAllTasks: (todolistId: string) => void;
};

export const Todolist: React.FC<PropsType> = ({
                                                  title: todolistTitle,
                                                  tasks,
                                                  removeTask,
                                                  changeFilter,
                                                  addTask,
                                                  changeTaskStatus,
                                                  filter,
                                                  id,
                                                  removeTodolist,
                                                  removeAllTasks,
                                              }) => {
    let [taskTitle, setTaskTitle] = useState('');
    let [error, setError] = useState<string | null>(null);

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(taskTitle.trim(), id);
            setTaskTitle('');
        } else {
            setError('Title is required');
        }
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTaskHandler();
        }
    };


    const onAllClickHandler = () => changeFilter('all', id);
    const onActiveClickHandler = () => changeFilter('active', id);
    const onCompletedClickHandler = () => changeFilter('completed', id);

    const removeTaskHandler = (taskId: string) => {
        removeTask(taskId, id);
    };

    const changeTaskStatusHandler = (taskId: string, isDone: boolean) => {
        changeTaskStatus(taskId, isDone, id);
    };

    return (
        <div>
            <>
                <h3>{todolistTitle}</h3>
                <button onClick={() => removeTodolist(id)}>Remove Todolist</button>
            </>

            <div>
                <input
                    value={taskTitle}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                    className={error ? 'error' : ''}
                />
                <button onClick={addTaskHandler}>+</button>
                {error && <div className="error-message">{error}</div>}
            </div>
            <ul>
                {tasks.map((t) => {
                    const onClickHandler = () => removeTaskHandler(t.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        changeTaskStatusHandler(t.id, e.currentTarget.checked);
                    };

                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input type="checkbox" onChange={onChangeHandler} checked={t.isDone} />
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>
                    );
                })}
            </ul>
            <div>
                <button className={filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>
                    All
                </button>
                <button className={filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>
                    Active
                </button>
                <button className={filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>
                    Completed
                </button>



            </div>
        </div>
    );
};