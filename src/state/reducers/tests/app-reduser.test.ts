import { appReducer, InitialAppStateType } from "../app-reducer";
import {setAppErrorAC, setAppStatusAC} from "../../actions/actionsApp";

describe('appReducer', () => {
    let initialState: InitialAppStateType;

    beforeEach(() => {
        initialState = {
            status: 'loading',
            error: null,
            isInitialized: true
        };
    });

    it('should set status correctly', () => {
        const action = setAppStatusAC('succeeded');
        const newState = appReducer(initialState, action);

        expect(newState.status).toBe('succeeded');
        expect(newState.error).toBeNull();
    });

    it('should set error correctly', () => {
        const error = 'Something went wrong!';
        const action = setAppErrorAC(error);
        const newState = appReducer(initialState, action);

        expect(newState.status).toBe('loading');
        expect(newState.error).toBe(error);
    });

});