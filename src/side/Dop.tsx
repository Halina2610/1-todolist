import { ChangeEvent, FC, useEffect, useState } from "react";
import { useHttp } from "../hooks/useHttp";


function stateSetter(payload: any, ...setState: Array<(payload: any) => void>) {
    return setState.map((fn, i: number) => fn(payload[i]))
}



export type PropsType = {

    userId: number,
    id: number,
    title: string,
    completed: boolean
}


export const Dop: FC = () => {

    const [todos, setTodos] = useState<Array<PropsType>>([])
    const [query, setQuery] = useState<boolean>(true)
    const [isLoading, setLoader] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')

    const { get, post } = useHttp()


    const mapTodos = todos.map(el => {
        return (
            <li key={el.id}>
                <span>{el.id} - </span>
                <span>{el.title}</span>
                <span>{el.completed}</span>
            </li>
        )
    })


    useEffect(() => {

        if (!query) {
            return
        }

        (async function () {
            stateSetter([true], setLoader)

            const data = await get('https://jsonplaceholder.typicode.com/todos')
            stateSetter([data, false], setTodos, setLoader)
      

        }())

    }, [query])

    const onCleanHandler = () => {
        stateSetter([[], false], setTodos, setQuery)
        
    }
    const onShowHandler = async () => {

        setQuery(true)
    }

    const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const addTitleinTodos = () => {

        setLoader(true)

        const newTodo = {
            userId: new Date().getTime(),
            id: new Date().getTime(),
            title: title,
            completed: false
        }

        const data = post('https://jsonplaceholder.typicode.com/todos', newTodo)
        data.then((data: any) => {

            const newTodos = [newTodo, ...todos]

            stateSetter([newTodos, '', false], setTodos, setTitle, setLoader)
         

        })



    }


    return (
        <>

            <input value={title} onChange={inputHandler} type="text" />
            <button onClick={addTitleinTodos}>Add title</button>
            <button onClick={onCleanHandler}>CLEAN POSTS</button>
            <button onClick={onShowHandler}>SHOW POSTS</button>
            <ul>
                {isLoading ? <h2>Loading...</h2> : !mapTodos.length ? <h2>No data</h2> : mapTodos}

            </ul>




        </>
    )
}