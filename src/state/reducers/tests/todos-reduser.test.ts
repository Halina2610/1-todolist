import {
  todosReducer,
  FilterValuesType,
  TodolistDomainType, todolistsActions
} from "state/reducers/todosSlice";


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

describe("todolistsReducer", () => {
  let initialState: Array<TodolistDomainType>;

  beforeEach(() => {
    initialState = [];
  });

  it("should remove a todolist", () => {
    const todolistId = "1";
    const action = todolistsActions.removeTodolist({id: todolistId});
    const newState = todosReducer(state, action);

    expect(newState.length).toBe(1);
    expect(newState[0].id).toBe("2");
  });

  it("should change the title of a todolist", () => {
    const todolistId = "1";
    const newTitle = "Updated Todos";
    const action = todolistsActions.changeTodolistTitle ({id: todolistId, title: newTitle});
    const newState = todosReducer(state, action);

    expect(newState.length).toBe(2);
    expect(newState[0].title).toBe(newTitle);
  });

  it("should change the filter of a todolist", () => {
    const todolistId = "1";
    const newFilter: FilterValuesType = "active";
    const action = todolistsActions.changeTodolistFilter({ id: todolistId, filter: newFilter});
    const newState = todosReducer(state, action);

    expect(newState.length).toBe(2);
    expect(newState[0].filter).toBe(newFilter);
  });

  it("should set the todolists", () => {
    const action = todolistsActions.setTodolists({todolists: state});
    const newState = todosReducer([], action);

    expect(newState.length).toBe(2);
    expect(newState[0].title).toBe("First Todos");
    expect(newState[1].title).toBe("Second Todos");
    expect(newState[0].filter).toBe("all");
    expect(newState[1].filter).toBe("all");
  });
});
