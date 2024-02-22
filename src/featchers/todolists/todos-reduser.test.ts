import {
  todosReducer,
  FilterValuesType,
  TodolistDomainType, todosActions
} from "featchers/todolists/todos-reducer";


const state: Array<TodolistDomainType> = [
  {
    id: "1",
    title: "First Todos",
    order: 0,
    addedDate: "",
    filter: "all",
    entityStatus: "idle",
  },
  {
    id: "2",
    title: "Second Todos",
    order: 0,
    addedDate: "",
    filter: "all",
    entityStatus: "idle",
  },
];

describe("todolistReducer", () => {
  let initialState: Array<TodolistDomainType>;

  beforeEach(() => {
    initialState = [];
  });

  it("should remove a todolist", () => {
    const todolistId = "1";
    const action = todosActions.removeTodos.fulfilled({ id: todolistId }, "requestId", '');
    const newState = todosReducer(state, action);

    expect(newState.length).toBe(1);
    expect(newState[0].id).toBe("2");
  });

  it("should change the title of a todolist", () => {
    const todolistId = "1";
    const newTitle = "Updated Todos";
    const action = todosActions.updateTodoTitle.fulfilled({ id: todolistId, title: newTitle }, 'requestId', { id: todolistId, title: newTitle });
    const newState = todosReducer(state, action);

    expect(newState.length).toBe(2);
    expect(newState[0].title).toBe(newTitle);
  });

  it("should change the filter of a todolist", () => {
    const todolistId = "1";
    const newFilter: FilterValuesType = "active";
    const action = todosActions.changeTodoFilter({ id: todolistId, filter: newFilter });
    const newState = todosReducer(state, action);

    expect(newState.length).toBe(2);
    expect(newState[0].filter).toBe(newFilter);
  });

  test("todolists should be added", () => {
    const action = todosActions.fetchTodos.fulfilled({ todos: initialState }, "requestId", undefined);
    const endState = todosReducer([], action);
    expect(endState.length).toBe(2);
  })

})
