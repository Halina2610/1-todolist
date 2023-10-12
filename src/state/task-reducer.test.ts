import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeAllTasksAC,
    removeTaskAC,
    tasksReducer, TasksStateType
} from "./task-reducer";

describe('tasksReducer', () => {
    let startState: TasksStateType;

    beforeEach(() => {
        startState = {
            todolist1: [
                { id: '1', title: 'Task 1', isDone: false },
                { id: '2', title: 'Task 2', isDone: true },
                { id: '3', title: 'Task 3', isDone: false },
            ],
            todolist2: [
                { id: '4', title: 'Task 4', isDone: true },
                { id: '5', title: 'Task 5', isDone: false },
            ],
        };
    });

    it('should add a new task to the specified todolist', () => {
        const newTaskTitle = 'New Task';
        const todolistId = 'todolist1';

        const action = addTaskAC(newTaskTitle, todolistId);

        const endState = tasksReducer(startState, action);

        expect(endState[todolistId].length).toBe(4);
        expect(endState[todolistId][0].title).toBe(newTaskTitle);
        expect(endState[todolistId][0].isDone).toBe(false);
    });

    it('should remove the specified task from the todolist', () => {
        const taskId = '2';
        const todolistId = 'todolist1';

        const action = removeTaskAC(taskId, todolistId);

        const endState = tasksReducer(startState, action);

        expect(endState[todolistId].length).toBe(2);
    });

    it('should change the status of the specified task', () => {
        const taskId = '3';
        const isDone = true;
        const todolistId = 'todolist1';

        const action = changeTaskStatusAC(taskId, isDone, todolistId);

        const endState = tasksReducer(startState, action);

        expect(endState[todolistId][2].isDone).toBe(isDone);
    });

    it('should change the title of the specified task', () => {
        const taskId = '5';
        const newTitle = 'Updated Task';
        const todolistId = 'todolist2';

        const action = changeTaskTitleAC(taskId, newTitle, todolistId);

        const endState = tasksReducer(startState, action);

        expect(endState[todolistId][1].title).toBe(newTitle);
    });

    it('should remove all tasks from the specified todolist', () => {
        const todolistId = 'todolist1';

        const action = removeAllTasksAC(todolistId);

        const endState = tasksReducer(startState, action);

        expect(endState[todolistId].length).toBe(0);
    });

    it('should return the same state if an invalid action type is provided', () => {
        const invalidAction = { type: 'INVALID-ACTION' } as any;

        const endState = tasksReducer(startState, invalidAction);

        expect(endState).toBe(startState);
    });
});