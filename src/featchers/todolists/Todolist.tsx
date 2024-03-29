import React, { memo, useCallback, useEffect } from "react";
import {
  FilterValuesType, todosActions
} from "featchers/todolists/todos-reducer";
import { Container, Grid, Paper } from "@mui/material";
import { Todos } from "featchers/todolists/todolist/Todos";
import { AddItemForm } from "components/addItemForm/AddItemForm";
import { ErrorSnackbar } from "components/ErrorSnackbar/ErrorSnackbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "featchers/auth/auth.selectors";
import { selectTasks } from "featchers/todolists/todolist/tasks.selectors";
import { selectTodolists } from "featchers/todolists/todos.selectors";
import { TaskStatuses } from "enums";
import { taskActions } from "featchers/todolists/todolist/tasks-reducer";
import { useAppDispatch } from "hooks/useAppDispatch";

export const Todolist = memo(() => {
  const todo = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      dispatch(todosActions.fetchTodos());
    }
  }, [navigate, isLoggedIn]);


  const removeTodolist = useCallback(
    (todoListId: string) => {
      dispatch(todosActions.removeTodos(todoListId));
    },
    [dispatch]
  );

  const removeTask = useCallback(
    function(id: string, todoListId: string) {
      dispatch(taskActions.removeTask({ id, todolistId: todoListId }));
    },
    [dispatch]
  );

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(todosActions.addTodos(title));
    },
    [dispatch]
  );

  const addTask = useCallback(
    (title: string, todoListId: string) => {
      dispatch(taskActions.addTask({ title, todolistId: todoListId }));
    },
    [dispatch]
  );

  const changeTodolistTitle = useCallback(
    (id: string, title: string) => {
      dispatch(todosActions.updateTodoTitle({ id, title }));
    },
    [dispatch]
  );

  const changeStatus = useCallback(
    function(taskId: string, status: TaskStatuses, todolistId: string) {
      dispatch(taskActions.updateTask({ taskId, domainModel: { status }, todolistId }));
    },
    [dispatch]
  );

  const changeTaskTitle = useCallback(
    function(taskId: string, title: string, todolistId: string) {
      dispatch(taskActions.updateTask({ taskId, domainModel: { title }, todolistId }));
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    (todoListId: string, filter: FilterValuesType) => {
      dispatch(todosActions.changeTodoFilter({ id: todoListId, filter }));
    },
    [dispatch]
  );

  return (
    <Container fixed>
      <Grid container style={{ marginTop: "10px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todo.map((tl) => {
          return (
            <Grid item key={tl.id}>
              <Paper style={{ paddingTop: "10px" }}>
                <Todos
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
          );
        })}
      </Grid>
      <ErrorSnackbar />
    </Container>
  );
});
