import {useState} from "react";
import {Task} from "./Task";
import {FilterProps, PropsType, TasksProps} from "../types/Types";
import {TodoForm} from "./TodoForm";
import {Button} from "./Button";
import {useAutoAnimate} from "@formkit/auto-animate/react";


export function Todolist({
    
 setTasks,
 tasksForRender,
 tasksForFilter,
 title,
 todoListID}: PropsType){


    const [filterStatus, setFilter] = useState<FilterProps>("All");
    const [listRef] = useAutoAnimate<HTMLUListElement>()


    const addTaskInTodo = (title: string, todoListID: string) => {
        const newTask: TasksProps = {
            id: crypto.randomUUID(),
            title: title,
            isDone: false,
        };

        const tasksArr = tasksForFilter[todoListID]
        const newTasks = [newTask, ...tasksArr]
        tasksForFilter[todoListID] = newTasks


        setTasks({...tasksForFilter});
    };

    const OnDeleteTask = (id: string, todoListId: string) => {
        const taskArr = tasksForFilter[todoListId]
        const filteredArr = taskArr.filter(task => task.id !== id)
        tasksForFilter[todoListId] = filteredArr


        setTasks({...tasksForFilter});
    };

    const onDeleteAllTasks = (todoListId: string) => {
        tasksForFilter[todoListId] = []
        setTasks({...tasksForFilter})

    };

    const FilterTask = (filter: FilterProps) => {
        setFilter(filter);
    };

    const toggleTask = (id: string, todoListId: string) => {

        const taskArr = tasksForFilter[todoListId]
        const task = taskArr.find(t => t.id === id)
        if (task) {
            task.isDone = !task.isDone
            console.log(task.isDone);

            setTasks({...tasksForFilter})
        }
    }

    const initFilteredTasks = () => {

        return tasksForRender.filter((task, i: number) => {
            switch (filterStatus) {
                case "All":
                    return task;
                case "Completed":
                    return task.isDone;
                case "Active":
                    return !task.isDone;
                case "First Three":
                    return task.firstThree;
                default:
                    throw new Error('No such filter')
            }
        });
    };

    const TodoElement = !initFilteredTasks().length ?
        <h3>No data</h3> :
        initFilteredTasks().map((t) => (

            <Task
                key={t.id}
                title={t.title}
                id={t.id}
                isDone={t.isDone}
                todoListId={todoListID}
                toggleTask={toggleTask}
                onDelete={OnDeleteTask}
            />

        ))

    return (
        <div>
            <h3>{title}</h3>

            <TodoForm
                todoListId={todoListID}
                onTodoFormHandler={addTaskInTodo}
            />

            <ul ref={listRef}>
                {TodoElement}
            </ul>

            <div style={{marginBottom: 20}}>
                <Button text={"Delete All Tasks"} onClick={() => onDeleteAllTasks(todoListID)}/>
            </div>
            <div>
                <Button text={"All"} onClick={() => FilterTask("All")}/>
                <Button text={"Completed"} onClick={() => FilterTask("Completed")}/>
                <Button text={"Active"} onClick={() => FilterTask("Active")}/>
                <Button text={"First Three"} onClick={() => FilterTask("First Three")}/>
            </div>
        </div>
    );
}
