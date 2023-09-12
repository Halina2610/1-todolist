import {useState} from "react";
import "../App.css";
import {Todolist} from "./Todolist";
import {TasksElems, TodoListProps} from "../types/Types";

function App() {

    const todoList = crypto.randomUUID()

    const [todoLists, setTodo] = useState<TodoListProps[]>([ // TodoLists general Interface
        {id: todoList, title: 'First Todo'},
    ])

    const [tasks, setTasks] = useState<TasksElems>({
        [todoList]: [
            {id: crypto.randomUUID(), title: "HTML&CSS", isDone: true, firstThree: true},
            {id: crypto.randomUUID(), title: "JS", isDone: true, firstThree: true},
            {id: crypto.randomUUID(), title: "ReactJS", isDone: false, firstThree: true},
            {id: crypto.randomUUID(), title: "Next JS", isDone: true},
            {id: crypto.randomUUID(), title: "GraphQL", isDone: false}
        ]
    })

    const filteredTasksForEachTodos = () => {
        return todoLists.map(todo => {
            
            return tasks[todo.id]
        })
    }

    const TodoElems = filteredTasksForEachTodos().map((t, i: number) => (

        <Todolist
            key={todoLists[i].id}
            setTasks={setTasks}
            tasksForFilter={tasks}
            todoListID={todoLists[i].id}
            title={todoLists[i].title}
            tasksForRender={t}
        />


    ))

    return (

        <div className="App">

            {!TodoElems.length ? <h2>No todos</h2> : TodoElems}


        </div>



    );
}

export default App;


