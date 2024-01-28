import React, {memo, useEffect} from 'react';
import './App.css';
import {Header} from "../featchers/header/Header";
import {Todolists} from "../featchers/todolists/Todolists";
import {Login} from "../featchers/login/Login";
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Error404} from "../featchers/error404/error404";
import {useAppDispatch, useAppSelector} from "../state/store/store";
import {CircularProgress} from "@mui/material";
import {initializedAppTC} from "../state/thunks/thunkAuth";

export const App = memo(() => {

    const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializedAppTC())
    }, [])

    if (!isInitialized) {
        return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30%'}}>
            <CircularProgress size={'100px'}/>
        </div>
    }


    return (
        <div className="App">
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path='/' element={<Todolists/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/error404' element={<Error404/>}/>
                    <Route path='*' element={<Navigate to="/error404"/>}/>
                </Routes>
            </BrowserRouter>

        </div>
    );
});