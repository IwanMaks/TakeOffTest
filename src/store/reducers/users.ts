import { IUserAction, IUserState } from '@src/types/user';
import { AnyAction } from 'redux'
import { END_LOADING, EXIT_USER, SIGNED_USER, START_LOADING } from '../types';

const initialState: IUserState = {
    id: 0,
    login: '',
    loading: false
}

export const usersReducer = (state = initialState, action: IUserAction):IUserState => {
    switch (action.type) {
        case SIGNED_USER:
            return {
                ...state,
                login: action.payload.login,
                id: action.payload.id,
                loading: false
            };
        case EXIT_USER:
            return {
                id: 0,
                login: '',
                loading: false
            }
        case START_LOADING: 
            return {
                ...state,
                loading: true
            }
        case END_LOADING: 
            return {
                ...state,
                loading: false
            }
        default: 
            return state;
    }
}