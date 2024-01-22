import {useState} from "react";
import {v1} from "uuid";
import {todolistId1, todolistId2} from "./utils/id-utils";
import {FilterValuesType, TodolistDomainType} from "../state/reducers/todolists-reducer";


export default function useTodolists (
    onTodolistRemoved: (id: string)=> void,
    onTodolistAdded: (newTodolistId: string) => void
) {

    let [todolists, setTodolists] = useState<Array<TodolistDomainType>>([
        {id: todolistId1, title: "What to learn", filter: "all", order: 0, addedDate: '', entityStatus: 'idle' },
        {id: todolistId2, title: "What to buy", filter: "all", order: 0, addedDate: '', entityStatus: 'idle'}
    ])

    function changeFilter(todolistId: string, filter: FilterValuesType) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = filter;
            setTodolists([...todolists])
        }
    }

    function removeTodolist(id: string) {
        setTodolists(todolists.filter(tl => tl.id != id));
        onTodolistRemoved(id)
    }

    function changeTodolistTitle(id: string, title: string) {
        const todolist = todolists.find(tl => tl.id === id);
        if (todolist) {
            todolist.title = title;
            setTodolists([...todolists]);
        }
    }

    function addTodolist(title: string) {
        let newTodolistId = v1();
        let newTodolist: TodolistDomainType = {id: newTodolistId, title: title, filter: 'all', addedDate: '', order: 0, entityStatus: 'idle'};
        setTodolists([newTodolist, ...todolists]);
        onTodolistAdded(newTodolistId)
    }

    return {
        todolists,
        changeFilter,
        removeTodolist,
        changeTodolistTitle,
        addTodolist
    }
}
