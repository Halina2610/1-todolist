import React from 'react';
import './App.css';
import {TodoList} from "./layout/TodoList";

const App = () => {
    return (
        <div className="App">
            <TodoList title={"What to learn"}/>
            <TodoList title={"Monday"}/>
            <TodoList title={"Tuesday"}/>
            <TodoList title={"Wednesday"}/>
        </div>
    );
}

export default App;
