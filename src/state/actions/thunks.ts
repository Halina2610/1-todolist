import {todolistsApi} from '../../api/todolists-api';
import {Dispatch} from "redux";
import {setTasksAC, setTodolistsAC} from "./actions";
import {AppActionsType, AppRootStateType} from "../store/store";
import {ThunkAction} from "redux-thunk";

type ThunkType<ReturnType = void> = ThunkAction<
    void,
    AppRootStateType,
    unknown,
    AppActionsType
>;
export const fetchTodolistsTC = (): ThunkType => {
    return async (dispatch: Dispatch<AppActionsType>) => {
        try {
            const res = await todolistsApi.getTodolists();
            dispatch(setTodolistsAC(res.data));
        } catch (error) {
            // Обработка ошибки, если не удалось получить данные
        }
    };
};

export const fetchTasksTC = (todolistId: string): ThunkType => {
    return async (dispatch: Dispatch<AppActionsType>) => {
        try {
            const res = await todolistsApi.getTasks(todolistId);
            dispatch(setTasksAC(res.data.items, todolistId));
        } catch ( error) {
        }
    };
};

// если есть необходимость пробросить санку в санку то типизация по образцу из урока https://samurai.it-incubator.io/pc/video-content/watch/621568eb265b22196715520d
/* или использовать ThunkType
export const PrimerTC = (todolistId: string): ThunkAction<void, AppRootStateType, unknown, AppActionsType> => {
    return (dispatch) => {
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                dispatch(setTasksAC(res.data.items, todolistId));
            });
    };
};*/
