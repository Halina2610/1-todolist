import React, {memo} from 'react';
import './App.css';
import {Header} from "./components/Header";
import {Todolists} from "./components/Todolists";


export const App = memo(() => {

    return (
        <div className="App">
            <Header/>
            <Todolists/>
        </div>
    );
})