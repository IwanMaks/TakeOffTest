import { IUserAction, IUserState } from '@src/types/user';
import { AnyAction } from 'redux'
import { EXIT_USER, SIGNED_USER } from '../types';

const initialState: IUserState = {
    id: 0,
    login: ''
}

export const usersReducer = (state = initialState, action: IUserAction):IUserState => {
    switch (action.type) {
        case SIGNED_USER:
            return {
                ...state,
                login: action.payload.login,
                id: action.payload.id
            };
        case EXIT_USER:
            return {
                id: 0,
                login: ''
            }
        default: 
            return state;
    }
}