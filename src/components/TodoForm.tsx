import {ChangeEvent, ReactNode, useRef, useState} from "react"
import {TodoFormPropsType} from "../types/Types"
import {Button} from "./Button";
import { ErrorMessage } from "./ErrorMessage";

type FormStateType = {
    title: string,
    error: boolean
}

export function TodoForm({onTodoFormHandler, todoListId}: TodoFormPropsType) {

    const [state, setState] = useState<FormStateType>({
        title: '',
        error: false
    })

    const {error, title} = state

    const onSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            error: false,
            title: e.currentTarget.value
        })
    }

    const addTask = () => {
        if (title.trim() === '') {
        
            setState({
                ...state,
                error: true
            })
           
            return
        }

        onTodoFormHandler(title, todoListId)
        setState({
            ...state,
            error: false,
            title: ''
        })
    }

  
  
    return (

        <div id="todo-form">

            <input
                
                onKeyDown={(e) => {e.key === 'Enter' && addTask()}}
                onChange={onSetTitle}
                value={title}
                name="title"
                type="text"
            />
            <Button text={'Add task'} onClick={addTask}/>

           
            {error ? <ErrorMessage 
                error={error}  
                render={() => <h2 className="error-msg">This field is required</h2>}
            /> : null}

        </div>
    )
}

