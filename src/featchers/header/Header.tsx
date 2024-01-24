import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {memo} from "react";
import LinearProgress from '@mui/material/LinearProgress/LinearProgress';
import {useAppSelector} from "../../state/store/store";
import {RequestStatusType} from "../../state/reducers/app-reducer";

export const Header = memo(() => {

   const status = useAppSelector<RequestStatusType>(state => state.app.status)

    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{mr: 2}}>
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolist
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
         {status === 'loading' &&  <LinearProgress color={'secondary'}/>}
        </Box>
    );
})