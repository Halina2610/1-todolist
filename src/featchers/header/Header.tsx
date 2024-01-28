import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {memo, useCallback, useState} from "react";
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import {useAppDispatch, useAppSelector} from "../../state/store/store";
import {RequestStatusType} from "../../state/reducers/app-reducer";
import {logoutTC} from "../../state/thunks/thunkAuth";

export const Header = memo(() => {

    const status = useAppSelector<RequestStatusType>(state => state.app.status)
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
    const dispatch = useAppDispatch()

    const logoutHandler = useCallback(() => {
        dispatch(logoutTC())
    }, [])

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon></MenuIcon>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolist
                    </Typography>
                    {isLoggedIn && <Button color="inherit" onClick={logoutHandler}>Log out</Button>}
                </Toolbar>
                {status === 'loading' ? (
                    <LinearProgress color={'secondary'}/>
                ) : (
                    <LinearProgress style={{opacity: 0}}/>
                )}
            </AppBar>
        </Box>
    );
})