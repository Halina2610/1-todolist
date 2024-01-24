import React, {memo} from 'react';
import './App.css';
import {Header} from "../featchers/header/Header";
import {Todolists} from "../featchers/todolists/Todolists";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";

type PropsType = {
    demo?: boolean
}
export const App = memo(({demo = false} : PropsType) => {

    return (
        <div className="App">
            <Header/>
            <Todolists demo={demo}/>
            <ErrorSnackbar />
        </div>
    );
})