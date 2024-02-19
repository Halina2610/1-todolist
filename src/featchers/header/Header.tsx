import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { memo, useCallback } from "react";
import LinearProgress from "@mui/material/LinearProgress/LinearProgress";
import { useAppDispatch } from "app/store";
import { logoutTC } from "featchers/auth/auth-thunk";
import { useSelector } from "react-redux";
import { selectAppStatus } from "app/app.selectors";
import { selectIsLoggedIn } from "featchers/auth/auth.selectors";

export const Header = memo(() => {
  const status = useSelector(selectAppStatus);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const logoutHandler = useCallback(() => {
    dispatch(logoutTC());
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon></MenuIcon>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todolist
          </Typography>
          {isLoggedIn && (
            <Button color="inherit" onClick={logoutHandler}>
              Log out
            </Button>
          )}
        </Toolbar>
        {status === "loading" ? (
          <LinearProgress color={"secondary"} />
        ) : (
          <LinearProgress style={{ opacity: 0 }} />
        )}
      </AppBar>
    </Box>
  );
});
