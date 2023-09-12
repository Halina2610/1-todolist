export type TasksProps = {
    isDone: boolean; 
    id: string;
    title: string;
    firstThree?: boolean
};


export type TaskTypeProps = {
    id: string,
    title: string
    isDone: boolean
    todoListId: string
    toggleTask: (id: string, todoListId: string) => void
    onDelete: (id: string, todoListId: string) => void


}

export type TasksElems = {
    [key: string]: TaskType[]
}

export type TodoListProps = {
    id: string,
    title: string,
   
}


export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
    firstThree?: boolean
  };
  
export type FilterProps = "All" | "Active" | "Completed" | "First Three";
  
export type PropsType = {
    title: string;
    tasksForRender: Array<TaskType>;
    todoListID: string
    tasksForFilter: TasksElems
    setTasks: (tasks: TasksElems) => void
};

export type TodoFormPropsType = {
    onTodoFormHandler: (title: string, todoListId: string) => void,
    todoListId: string

}

export type ButtonFilterProps = {
    text: string,
    callback: () => void,
    _disabled?: boolean
}

export type ButtonProps = {
    text: string,
    callback: () => void,
    _disabled?: boolean
}

export type TButton =  ButtonProps | ButtonFilterProps