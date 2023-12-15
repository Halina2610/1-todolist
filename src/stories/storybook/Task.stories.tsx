import {action} from '@storybook/addon-actions';
import {Task} from "../../components/Task";

export default {
    title: 'TASK',
    component: Task,
};


const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const removeTaskCallback = action('Remove Button clicked changed inside Task')

export const meta = {
    title: 'TODOLISTS/Task',
    component: Task,
    tags: ['autodocs'],
    args: {
        changeTaskStatus: changeTaskStatusCallback,
        changeTaskTitle: changeTaskTitleCallback,
        removeTask: removeTaskCallback,
        task: {id: '12wsdewfijdei', title: 'JS', isDone: false},
        todolistId: 'fgdosrg8rgjuh',
    },
};

export const TaskIsNotDoneStory = () => (
    <Task
        todolistId={'jfkfflld'}
        changeTaskStatus={changeTaskStatusCallback}
        changeTaskTitle={changeTaskTitleCallback}
        removeTask={removeTaskCallback}
        task={{id: '12wsdewfijdei2343', title: 'CSS', isDone: false}}
    />
);

export const TaskIsDoneStory = () => (
    <Task
        todolistId={'jfkffddddlld'}
        changeTaskStatus={changeTaskStatusCallback}
        changeTaskTitle={changeTaskTitleCallback}
        removeTask={removeTaskCallback}
        task={{id: '12wsdewfijdei2343', title: 'CSS', isDone: true}}
    />
);

export const TaskStory = () => (
    <>
        <Task
            todolistId={'jfkfffflld'}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            task={{id: '12wsdewfijdei2343', title: 'CSS', isDone: false}}
        />
        <Task
            todolistId={'jfkfffflld'}
            changeTaskStatus={changeTaskStatusCallback}
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            task={{id: '12wsdewfijdei2343', title: 'HTML', isDone: true}}
        />
    </>

);