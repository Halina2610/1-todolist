import React, { memo, useCallback, useEffect } from "react";
import {
  FilterValuesType, todolistsActions
} from "state/reducers/todosSlice";
import { useAppDispatch } from "state/store/store";
import { Container, Grid, Paper } from "@mui/material";
import {
  addTaskTC,
  removeTaskTC,
  updateTaskTC,
} from "state/thunks/tasksThunks";
import { Todos } from "featchers/todolists/todolist/Todos";
import { TaskStatuses } from "api/todolistApi";
import { AddItemForm } from "components/addItemForm/AddItemForm";
import {
  addTodolistTC,
  fetchTodolistsTC,
  removeTodolistTC,
  updateTodolistTitleTC,
} from "state/thunks/todosThunk";
import { ErrorSnackbar } from "components/ErrorSnackbar/ErrorSnackbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "state/selectors/auth.selectors";
import { selectTasks } from "state/selectors/tasks.selectors";
import { selectTodolists } from "state/selectors/todos.selectors";

export const TodoLists = memo(() => {
  const todolists = useSelector(selectTodolists);
  const tasks = useSelector(selectTasks);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      dispatch(fetchTodolistsTC());
    }
  }, [isLoggedIn, navigate]);



  const removeTodolist = useCallback(
    (todoListId: string) => {
      dispatch(removeTodolistTC(todoListId));
    },
    [dispatch],
  );

  const removeTask = useCallback(
    function (id: string, todoListId: string) {
      dispatch(removeTaskTC(id, todoListId));
    },
    [dispatch],
  );

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title));
    },
    [dispatch],
  );

  const addTask = useCallback(
    (title: string, todoListId: string) => {
      dispatch(addTaskTC(title, todoListId));
    },
    [dispatch],
  );

  const changeTodolistTitle = useCallback(
    (id: string, title: string) => {
      dispatch(updateTodolistTitleTC(id, title));
    },
    [dispatch],
  );

  const changeStatus = useCallback(
    function (id: string, status: TaskStatuses, todolistId: string) {
      dispatch(updateTaskTC(id, { status }, todolistId));
    },
    [dispatch],
  );

  const changeTaskTitle = useCallback(
    function (id: string, newTitle: string, todolistId: string) {
      dispatch(updateTaskTC(id, { title: newTitle }, todolistId));
    },
    [dispatch],
  );

  const changeFilter = useCallback(
    (todoListId: string, filter: FilterValuesType) => {
      dispatch(todolistsActions.changeTodolistFilter({id: todoListId, filter}));
    },
    [dispatch],
  );

  return (
    <Container fixed>
      <Grid container style={{ marginTop: "10px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map((tl) => {
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
