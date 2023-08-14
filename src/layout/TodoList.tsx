import React from 'react';
import {Button} from "../components/Button";

type TodoListPropsType = {
    title: string
    tasks?: TaskType[] // или запись Array<TaskType> // обе записи корректны

}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}
export const TodoList = (props: TodoListPropsType) => {
    return (
            <div className="Todolist">
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <Button text={"+"}/>
                </div>
                <ul>
                    <li><input type="checkbox" checked={true}/> <span>HTML&CSS</span></li>
                    <li><input type="checkbox" checked={true}/> <span>JS</span></li>
                    <li><input type="checkbox" checked={false}/> <span>React</span></li>
                </ul>
                <div>
                    <Button text={"All"}/>
                    <Button text={"Active"}/>
                    <Button text={"Completed"}/>
                </div>
        </div>
    );
};

