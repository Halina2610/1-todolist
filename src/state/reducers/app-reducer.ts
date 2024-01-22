import {setAppErrorAC, setAppStatusAC} from "../actionsAndThunck/actions";

const initialState: InitialAppStateType = {
    status: 'loading',
    error: null
}

export const appReducer = (state: InitialAppStateType = initialState, action: ActionsAppType): InitialAppStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR': {
            return {...state, error: action.error}
        }
        default:
            return state
    }
}


// types:
export type ActionsAppType = setStatusActionType |  setErrorActionType

type setStatusActionType = ReturnType<typeof setAppStatusAC>
type setErrorActionType = ReturnType<typeof setAppErrorAC>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialAppStateType = {
    status: RequestStatusType
    error: string | null
}

