import { TaskPriorities, TaskStatuses, TaskType, UpdateTaskType } from "api/todolistApi";
import {
  taskActions,
  TaskDomainType,
  tasksReducer,
  TaskStateType,
} from "../tasks-reducer";

describe("tasksReducer", () => {

  it("should handle removeTask action", () => {
    const taskId = "1";
    const todolistId = "todolist-1";
    const existingTask: TaskDomainType = {
      id: taskId,
      title: "Task 1",
      status: TaskStatuses.New,
      todoListId: todolistId,
      startDate: "",
      deadline: "",
      addedDate: "",
      order: 0,
      priority: TaskPriorities.Low,
      description:'',
      entityStatusTask: "idle"
    };
    const existingTasks: TaskDomainType[] = [existingTask];
    const state: TaskStateType = {
      [todolistId]: existingTasks,
    };

    const action = taskActions.removeTask({ taskId, todolistId });

    const newState = tasksReducer(state, action);

    expect(newState[todolistId]).toHaveLength(0);
  });

  it("should handle addTask action", () => {
    const task: TaskType = {
      id: "1",
      title: "New Task",
      status: TaskStatuses.New,
      priority: TaskPriorities.Low,
      description: "",
      startDate: "",
      deadline: "",
      todoListId: "todolist-1",
      order: 0,
      addedDate: "",
    };
    const todolistId = "todolist-1";
    const state: TaskStateType = {};

    const action = taskActions.addTask({ task, todolistId });

    const newState = tasksReducer(state, action);

    expect(newState[todolistId]).toHaveLength(1);
    expect(newState[todolistId][0]).toEqual(task);
  });

  it("should handle updateTask action", () => {
    const taskId = "1";
    const model: UpdateTaskType = {
      title: "Updated Task",
      description: "",
      status: TaskStatuses.InProgress,
      priority: TaskPriorities.Middle,
      startDate: "",
      deadline: "",
    };
    const todolistId = "todolist-1";
    const existingTask: TaskDomainType = {
      id: taskId,
      title: "Task 1",
      description: '',
      status: TaskStatuses.New,
      todoListId: todolistId,
      startDate: "",
      deadline: "",
      addedDate: "",
      order: 0,
      priority: TaskPriorities.Low,
      entityStatusTask: "idle"
    };
    const existingTasks: TaskDomainType[] = [existingTask];
    const state: TaskStateType = {
      [todolistId]: existingTasks,
    };

    const action = taskActions.updateTask({ taskId, model, todolistId });

    const newState = tasksReducer(state, action);

    expect(newState[todolistId][0].title).toEqual(model.title);
    expect(newState[todolistId][0].status).toEqual(model.status);
    expect(newState[todolistId][0].priority).toEqual(model.priority);
  });

  it("should handle setTasks action", () => {
    const tasks: TaskType[] = [
      {
        id: "1",
        title: "Task 1",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        description: "",
        startDate: "",
        deadline: "",
        todoListId: "todolist-1",
        order: 0,
        addedDate: "",
      },
      {
        id: "2",
        title: "Task 2",
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        description: "",
        startDate: "",
        deadline: "",
        todoListId: "todolist-1",
        order: 0,
        addedDate: "",
      },
    ];
    const todolistId = "todolist-1";
    const state: TaskStateType = {};

    const action = taskActions.setTasks({ tasks, todolistId });

    const newState = tasksReducer(state, action);

    expect(newState[todolistId]).toHaveLength(2);
    expect(newState[todolistId]).toEqual(tasks);
  });}
)