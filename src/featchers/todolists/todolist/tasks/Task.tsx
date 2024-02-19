import React, { ChangeEvent, memo, useCallback } from "react";
import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "components/editableSpan/EditableSpan";
import { TaskType } from "api/todolistApi";
import { useSelector } from "react-redux";
import { TaskStatuses } from "enums";
import { selectAppStatus } from "app/app.selectors";
import Checkbox from "@mui/material/Checkbox/Checkbox";

type TaskPropsType = {
  changeTaskStatus: (
    id: string,
    status: TaskStatuses,
    todolistId: string
  ) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string
  ) => void;
  removeTask: (taskId: string, todolistId: string) => void;
  task: TaskType;
  todolistId: string;
};

export const Task = memo(({ task, todolistId, ...props }: TaskPropsType) => {
  const onClickHandler = () => {
    props.removeTask(task.id, todolistId);
  };

  const entityStatus = useSelector(selectAppStatus);

  const onChangeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newStatusValue = e.currentTarget.checked
        ? TaskStatuses.Completed
        : TaskStatuses.New;
      props.changeTaskStatus(task.id, newStatusValue, todolistId);
    },
    [task.id, todolistId]
  );

  const onTitleChangeHandler = useCallback(
    (newValue: string) => {
      props.changeTaskTitle(task.id, newValue, todolistId);
    },
    [task.id, todolistId]
  );

  return (
    <div
      key={task.id}
      className={task.status === TaskStatuses.Completed ? "is-done" : ""}
    >
      <Checkbox
        checked={task.status === TaskStatuses.Completed}
        color="primary"
        onChange={onChangeHandler}
      />
      <EditableSpan
        value={task.title}
        onChange={onTitleChangeHandler}
        entityStatus={entityStatus}
      />
      <IconButton
        onClick={onClickHandler}
        disabled={entityStatus === "loading"}
      >
        <Delete />
      </IconButton>
    </div>
  );
});