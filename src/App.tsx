import React, {useState} from 'react';
import {TaskType,  Todolist} from './layout/TodoList';


export type sortedType = 'All' | 'Active' | 'Completed';

const App=() => {

    const [tasks, setTasks] = useState<Array<TaskType>>([ //<Array<TaskType>> - протипизировали юстейт
        {id: 1, title: 'HTML&CSS', isDone: true}, //создаем хук, который следит за текущим состоянием массива
        {id: 2, title: 'JS', isDone: true}, //где таск - начльное, сеттаск - текущее. Текущее состояние вызываем функции ремувтаск
        {id: 3, title: 'ReactJS', isDone: false},//
        {id: 4, title: 'ReactJS', isDone: false},
        {id: 5, title: 'ReactJS', isDone: false}
    ])

    //бъявляем юстейт для сортировки
    const [currentSort, setCurrentSort] = useState<sortedType>('All');

    const removeTask = (id: number) => {
        const filterTasks = tasks.filter(t => t.id !== id);
        //в функции ремувтаск объявлена еще одна функция: отфильтровать массив таксков и удалить из него равно выбранной id при клике. Является колбекфункцией
        setTasks(filterTasks) //используется для обновления состояния tasks при удалении задачи.
    }
//функция для значения кнопки
    const changeSort = (value: sortedType) => {
        setCurrentSort(value);
    }
    let sortedTasks = tasks; // задачи по умолчанию без сортировки
    if (currentSort === 'Active') {
        sortedTasks = tasks.filter((task) => !task.isDone);
    } else if (currentSort === 'Completed') {
        sortedTasks = tasks.filter((task) => task.isDone);
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={sortedTasks}
                setTasks={setTasks}
                removeTask={removeTask}
                changeSort={changeSort}/>
        </div>
    );
}

export default App;
