import {v1} from 'uuid';
import {
    todolistsReducer,
    FilterValuesType,
    TodolistDomainType,
} from '../todolists-reducer';
import {changeTodolistFilterAC, removeTodolistAC, setTodolistsAC, updateTodolistTitleAC} from "../../actionsAndThunck/actions";



const state: Array<TodolistDomainType> = [
    {id: '1', title: 'First Todolist', order: 0, addedDate: '', filter: 'all', entityStatus: 'idle'},
    {id: '2', title: 'Second Todolist', order: 0, addedDate: '', filter: 'all', entityStatus: 'idle'},
];

describe('todolistsReducer', () => {
    let initialState: Array<TodolistDomainType>;

    beforeEach(() => {
        initialState = [];
    });

    it('should remove a todolist', () => {
        const todolistId = '1';
        const action = removeTodolistAC(todolistId);
        const newState = todolistsReducer(state, action);

        expect(newState.length).toBe(1);
        expect(newState[0].id).toBe('2');
    });


    it('should change the title of a todolist', () => {
        const todolistId = '1';
        const newTitle = 'Updated Todolist';
        const action = updateTodolistTitleAC(todolistId, newTitle);
        const newState = todolistsReducer(state, action);

        expect(newState.length).toBe(2);
        expect(newState[0].title).toBe(newTitle);
    });

    it('should change the filter of a todolist', () => {
        const todolistId = '1';
        const newFilter: FilterValuesType = 'active';
        const action = changeTodolistFilterAC(todolistId, newFilter);
        const newState = todolistsReducer(state, action);

        expect(newState.length).toBe(2);
        expect(newState[0].filter).toBe(newFilter);
    });

    it('should set the todolists', () => {
        const action = setTodolistsAC(state);
        const newState = todolistsReducer([], action);

        expect(newState.length).toBe(2);
        expect(newState[0].title).toBe('First Todolist');
        expect(newState[1].title).toBe('Second Todolist');
        expect(newState[0].filter).toBe('all');
        expect(newState[1].filter).toBe('all');
    });
});