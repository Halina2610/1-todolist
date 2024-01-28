import Checkbox from '@mui/material/Checkbox/Checkbox'
import React, {ChangeEvent, memo, useCallback} from 'react'
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {EditableSpan} from "../../../components/editableSpan/EditableSpan";
import {TaskStatuses, TaskType} from "../../../api/todolistApi";
import {RequestStatusType} from "../../../state/reducers/app-reducer";
import {useAppSelector} from "../../../state/store/store";

type TaskPropsType = {
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = memo((props: TaskPropsType) => {

    const onClickHandler = useCallback(() => props.removeTask(props.task.id, props.todolistId), [props.task.id, props.todolistId]);
    const entityStatus = useAppSelector<RequestStatusType>(state => state.app.status)

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newStatusValue = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
        props.changeTaskStatus(props.task.id, newStatusValue, props.todolistId);
    }, [props.task.id, props.todolistId]);

    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId);
    }, [props.task.id, props.todolistId]);

    return (
        <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed}
            color="primary"
            onChange={onChangeHandler}
        />
        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} entityStatus={entityStatus}/>
        <IconButton onClick={onClickHandler} disabled={entityStatus === 'loading'}>
            <Delete/>
        </IconButton>
    </div>
    )
})
