import {TaskTypeProps} from "../types/Types";


export function Task({id, isDone, title, onDelete, todoListId, toggleTask}: TaskTypeProps) {


    return (
        <li key={id}>

            <input
                onChange={() => toggleTask(id, todoListId)}
                data-checked={isDone}
                id={id}
                type="checkbox"
                checked={isDone}/>
            <label className={isDone ? 'done-task' : ''} htmlFor={id}>{title}</label>
            <span
                onClick={() => onDelete(id, todoListId)}
                style={{cursor: 'pointer'}}>&times;</span>

        </li>
    )

}   