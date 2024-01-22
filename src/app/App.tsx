import React, {memo} from 'react';
import './App.css';
import {Header} from "../featchers/header/Header";
import {Todolists} from "../featchers/todolists/Todolists";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";


export const App = memo(() => {

    return (
        <div className="App">
            <Header/>
            <Todolists/>
            <ErrorSnackbar />
        </div>
    );
})