import React, {useEffect, useState} from 'react';
import {todolistsApi} from "../../api/todolists-api";

export default {
    title: 'API',
};

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);

    useEffect(() => {
        todolistsApi.getTodolists()
            .then((res) => {
                debugger;
                setState(res.data);
            })
            .catch(error => {
                console.log(error.message)
            });
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [title, setTitle] = useState<string>('');

    const onclickHandler = () => {
        todolistsApi.createtTodolist(title)
            .then((res) => {
                debugger;
                setState(res.data);
            })
            .catch(error => {
                console.log(error.message)
            });
    };

    return <div>
        {JSON.stringify(state)}
        <div>
            <input
                placeholder={"Enter title todolist"}
                value={title}
                onChange={(e) => {setTitle(e.currentTarget.value)}}
            />
            <button onClick={onclickHandler}>Create todolist</button>
        </div>
    </div>;
};

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('')
    const DeleteTodolistHandler = () => {

        todolistsApi.deleteTodolist(todolistId)
            .then((res) => {
                debugger;
                setState(res.data);
            })
            .catch(error => {
                console.log(error.message)
            });
    };

    return <div>
        {JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}
            />

            <button onClick={DeleteTodolistHandler}>Delete todolist</button>
        </div>
    </div>;
};

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('')
    const [title, setTitle] = useState<string>('')

    const onClickHandler = () => {
        todolistsApi.updateTodolist(title, todolistId)
            .then((res) => {
                debugger;
                setState(res.data);
            })
            .catch(error => {
                console.log(error.message)
            })

    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}
            />
            <input  placeholder={'title'}
                    value={title}
                    onChange={(e) => {
                        setTitle(e.currentTarget.value)
                    }}/>
            <button onClick={onClickHandler}>Update todolist</button>
        </div>
    </div>;
};


export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');

    const GetTaskHandler = () => {
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                debugger;
                setState(res.data.items);
            })
            .catch(error => {
                console.log(error.message)
            });
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input
                placeholder={todolistId}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}/>
            <button onClick={GetTaskHandler}>Get tasks</button>
        </div>

    </div>;
};

export const PostTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
        const [title, setTitle] = useState<string>('');

    const PostTaskHandler = () => {

        todolistsApi.createTask(todolistId, title)
            .then((res) => {
                debugger;
                setState(res.data);
            })
            .catch(error => {
                console.log(error.message)
            });
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}
            />
            <input
                placeholder={'new task'}
                value={title}
                onChange={(e) => {
                    setTitle(e.currentTarget.value)
                }}
            />
            <button onClick={PostTaskHandler}>Post task</button>
        </div>
    </div>;
};


export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null);
    const [taskId, setTaskId] = useState<string>('');
    const [todolistId, setTodolistId] = useState<string>('');

    const DeleteTaskHandler = () => {

        todolistsApi.deleteTask(todolistId, taskId)
            .then((res) => {
                debugger;
                setState(res.data);
            })
            .catch(error => {
                console.log(error.message)
            });
    }
    useEffect(() => {

    }, []);

    return <div>
        {JSON.stringify(state)}
        <div>
            <input
                placeholder={'todolistId'}
                value={todolistId}
                onChange={(e) => {
                    setTodolistId(e.currentTarget.value)
                }}
            />
            <input
                placeholder={'taskId'}
                value={taskId}
                onChange={(e) => {
                    setTaskId(e.currentTarget.value)
                }}
            />
            <button onClick={DeleteTaskHandler}>Delete task</button>
        </div>
    </div>;
};

export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [status, setStatus] = useState<number>(0);

   const onClickHandler = () => {

        todolistsApi.updateTasks
        (todolistId, taskId, title,
            '', status, 1,
            '', '')

            .then((res) => {
                debugger;
                setState(res.data);
            })
            .catch(error => {
                console.log(error.message)
            });
    }

    return <div>
        {JSON.stringify(state)}
        <input
            placeholder={'todolistId'}
            value={todolistId}
            onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}
        />
        <input
            placeholder={'taskId'}
            value={taskId}
            onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}
        />
        <input
            placeholder={'new title'}
            value={title}
            onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}
        />
        <input
            placeholder={'status'}
            value={status}
            onChange={(e) => {
                setStatus+(e.currentTarget.value)
            }}
        />
        <button onClick={onClickHandler}>Update task</button>
   </div>;
};


