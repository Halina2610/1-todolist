import {v1} from 'uuid';
import {
    todolistsReducer,
    removeTodolistAC,
    addTodolistAC,
    changeTodolistTitleAC,
    changeTodolistFilterAC,
    setTodolistsAC,
    FilterValuesType,
    SetTodolistsType,
    TodolistDomainType,
} from '../todolists-reducer';

describe('todolistsReducer', () => {
    let initialState: Array<TodolistDomainType>;

    beforeEach(() => {
        initialState = [];
    });

    it('should remove a todolist', () => {
        const todolistId = '1';
        const state: Array<TodolistDomainType> = [
            {id: '1', title: 'First Todolist', order: 0, addedDate: '', filter: 'all'},
            {id: '2', title: 'Second Todolist', order: 0, addedDate: '', filter: 'all'},
        ];
        const action = removeTodolistAC(todolistId);

        const newState = todolistsReducer(state, action);

        expect(newState.length).toBe(1);
        expect(newState[0].id).toBe('2');
    });

    it('should add a todolist', () => {
        const title = 'New Todolist';
        const action = addTodolistAC(title);

        const newState = todolistsReducer(initialState, action);

        expect(newState.length).toBe(1);
        expect(newState[0].title).toBe(title);
        expect(newState[0].filter).toBe('all');
    });

    it('should change the title of a todolist', () => {
        const todolistId = '1';
        const newTitle = 'Updated Todolist';
        const state: Array<TodolistDomainType> = [
            {id: '1', title: 'First Todolist', order: 0, addedDate: '', filter: 'all'},
            {id: '2', title: 'Second Todolist', order: 0, addedDate: '', filter: 'all'},
        ];
        const action = changeTodolistTitleAC(todolistId, newTitle);

        const newState = todolistsReducer(state, action);

        expect(newState.length).toBe(2);
        expect(newState[0].title).toBe(newTitle);
    });

    it('should change the filter of a todolist', () => {
        const todolistId = '1';
        const newFilter: FilterValuesType = 'active';
        const state: Array<TodolistDomainType> = [
            {id: '1', title: 'First Todolist', order: 0, addedDate: '', filter: 'all'},
            {id: '2', title: 'Second Todolist', order: 0, addedDate: '', filter: 'all'},
        ];
        const action = changeTodolistFilterAC(todolistId, newFilter);

        const newState = todolistsReducer(state, action);

        expect(newState.length).toBe(2);
        expect(newState[0].filter).toBe(newFilter);
    });

    it('should set the todolists', () => {
        const todolists: Array<TodolistDomainType> = [
            {id: '1', title: 'First Todolist', order: 0, addedDate: '', filter: 'all'},
            {id: '2', title: 'Second Todolist', order: 0, addedDate: '', filter: 'all'},
        ];
        const action: SetTodolistsType = setTodolistsAC(todolists);

        const newState = todolistsReducer(initialState, action);

        expect(newState.length).toBe(2);
        expect(newState[0].title).toBe('First Todolist');
        expect(newState[1].title).toBe('Second Todolist');
        expect(newState[0].filter).toBe('all');
        expect(newState[1].filter).toBe('all');
    });
});