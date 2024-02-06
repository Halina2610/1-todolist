import React, { memo, useCallback } from "react";
import { Delete } from "@mui/icons-material";
import { EditableSpan } from "components/editableSpan/EditableSpan";
import { AddItemForm } from "components/addItemForm/AddItemForm";
import { Task } from "./Task";
import { IconButton } from "@mui/material";
import { ButtonContainer } from "components/buttons/ButtonContainer";
import { TaskStatuses, TaskType } from "api/todolistApi";
import {
  FilterValuesType,
  TodolistDomainType,
} from "state/reducers/todosSlice";

type PropsType = {
  todolist: TodolistDomainType;
  tasks: Array<TaskType>;
  changeFilter: (todolistId: string, filter: FilterValuesType) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    id: string,
    status: TaskStatuses,
    todolistId: string,
  ) => void;
  changeTaskTitle: (
    taskId: string,
    newTitle: string,
    todolistId: string,
  ) => void;
  removeTask: (taskId: string, todolistId: string) => void;
  removeTodolist: (id: string) => void;
  changeTodolistTitle: (id: string, newTitle: string) => void;
};

export const Todos = memo(function (props: PropsType) {

  const addTask = useCallback(
    (title: string) => {
      props.addTask(title, props.todolist.id);
    },
    [props.addTask, props.todolist.id],
  );

  const removeTodolist = () => props.removeTodolist(props.todolist.id);

  const changeTodolistTitle = useCallback(
    (title: string) => {
      props.changeTodolistTitle(props.todolist.id, title);
    },
    [props.todolist.id, props.changeTodolistTitle],
  );

  const onAllClickHandler = useCallback(
    () => props.changeFilter(props.todolist.id, "all"),
    [props.changeFilter, props.todolist.id],
  );

  const onActiveClickHandler = useCallback(
    () => props.changeFilter(props.todolist.id, "active"),
    [props.changeFilter, props.todolist.id],
  );

  const onCompletedClickHandler = useCallback(
    () => props.changeFilter(props.todolist.id, "completed"),
    [props.changeFilter, props.todolist.id],
  );

  let tasksForTodolist = props.tasks;

  if (props.todolist.filter === "active") {
    tasksForTodolist = props.tasks.filter((t) => t.status === TaskStatuses.New);
  }
  if (props.todolist.filter === "completed") {
    tasksForTodolist = props.tasks.filter(
      (t) => t.status === TaskStatuses.Completed,
    );
  }

  return (
    <div style={{ minHeight: "300px", padding: "50px" }}>
      <h3>
        <EditableSpan
          value={props.todolist.title}
          onChange={changeTodolistTitle}
          entityStatus={props.todolist.entityStatus}
        />
        <IconButton
          onClick={removeTodolist}
          disabled={props.todolist.entityStatus === "loading"}
        >
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm
        addItem={addTask}
        entityStatus={props.todolist.entityStatus}
      />
      <div>
        {tasksForTodolist.map((t) => (
          <Task
            task={t}
            changeTaskStatus={props.changeTaskStatus}
            changeTaskTitle={props.changeTaskTitle}
            removeTask={props.removeTask}
            todolistId={props.todolist.id}
            key={t.id}
          />
        ))}
      </div>
      <div style={{ paddingTop: "10px" }}>
        <ButtonContainer
          filter={props.todolist.filter}
          onClick={onAllClickHandler}
          color="inherit"
          variant={props.todolist.filter === "all" ? "outlined" : "text"}
        >
          All
        </ButtonContainer>

        <ButtonContainer
          filter={props.todolist.filter}
          onClick={onActiveClickHandler}
          color="primary"
          variant={props.todolist.filter === "active" ? "outlined" : "text"}
        >
          Active
        </ButtonContainer>

        <ButtonContainer
          filter={props.todolist.filter}
          onClick={onCompletedClickHandler}
          color="secondary"
          variant={props.todolist.filter === "completed" ? "outlined" : "text"}
        >
          Completed
        </ButtonContainer>
      </div>
    </div>
  );
});
