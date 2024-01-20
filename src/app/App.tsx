import React, {memo} from 'react';
import './App.css';
import {Header} from "../featchers/header/Header";
import {Todolists} from "../featchers/todolists/Todolists";


export const App = memo(() => {

    return (
        <div className="App">
            <Header/>
            <Todolists/>
        </div>
    );
})