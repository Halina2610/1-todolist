import React, {useState} from 'react';
import './App.css';
import {sortedType, Todolist} from './layout/TodoList';

function App() {

    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true}, //создаем хук, который следит за текущим состоянием массива
        {id: 2, title: 'JS', isDone: true}, //где таск - начльное, сеттаск - текущее. Текущее состояние вызываем функции ремувтаск
        {id: 3, title: 'ReactJS', isDone: false},//
        {id: 4, title: 'ReactJS', isDone: false},
        {id: 5, title: 'ReactJS', isDone: false}
    ])


    const removeTask = (id: number) => {
        const filterTasks = tasks.filter(t => t.id !== id);
        //в функции ремувтаск обявлена еще одна функция: отфильтровать массив таксков и удалить из него равно выбранной id при клике. Является колбекфункцией
        setTasks(filterTasks) //используется для обновления состояния tasks при удалении задачи.
    }
    //бъявляем юстейт

    const [currentSort, setCurrentSort] = useState<sortedType>('All');
    const setSort = (value: sortedType) => {
        setCurrentSort(value);
    };
    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks}
                removeTask={removeTask}
                setTasks={setTasks}
                setSort={setSort}
                currentSort={currentSort}/>

        </div>
    );
}

export default App;
