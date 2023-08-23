import React, { useState } from 'react';

type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
};

export type sortedType = 'All' | 'Active' | 'Completed';

type PropsType = {
    title: string;
    tasks: Array<TaskType>;
    removeTask: (taskId: number) => void;
    setTasks: (tasks: Array<TaskType>) => void; // Добавляем функцию setTasks, обновляет список задач - пропсы для передачи значений в App, new task
    setSort: (value: sortedType) => void;
    currentSort: sortedType; // Добавить проп currentSort
};

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState(''); // определить функцию для добавления нового таска, хук имеет начальное значение пустая строка
    // деструктуризация массива, чтобы присвоить первый элемент (текущее значение состояния) переменной newTaskTitle
    // и второй элемент (функцию для обновления состояния) переменной setNewTaskTitle

    const addTask = () => {
        // обработчик события для добавления новой задачи в список задач
        if (newTaskTitle.trim() !== '') {
            // проверяем, что то, что вводим, не пустая строка и не пробел
            const newTask = {
                id: props.tasks.length + 1, // добавляем уникальный id
                title: newTaskTitle,
                isDone: false,
            };

            setNewTaskTitle('');
            props.setTasks([...props.tasks, newTask]);
        }
    };

    // обработчик события
    const handleSort = (value: sortedType) => {
        props.setSort(value); // Вызов функции setSort из пропсов
    };

    let sortedTasks = props.tasks; // задачи по умолчанию без сортировки
    if (props.currentSort === 'Active') {
        sortedTasks = props.tasks.filter((task) => !task.isDone);
    } else if (props.currentSort === 'Completed') {
        sortedTasks = props.tasks.filter((task) => task.isDone);
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    type="text"
                    value={newTaskTitle} // передаем новое название таски
                    onChange={(t) => setNewTaskTitle(t.target.value)}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {sortedTasks.map((t, index) => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone} />
                            <span>{t.title}</span>
                            <button
                                style={{ margin: 10 }}
                                onClick={() => props.removeTask(t.id)}
                            >
                                ✖️
                            </button>
                            {/* запускаем колбек */}
                        </li>
                    );
                })}
            </ul>
            <div>
                <button onClick={() => handleSort('All')}>All</button>
                <button onClick={() => handleSort('Active')}>Active</button>
                <button onClick={() => handleSort('Completed')}>Completed</button>
            </div>
        </div>
    );
}