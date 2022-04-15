import { IUserAction, IUserState } from '@src/types/user';
import { AnyAction } from 'redux'
import { SIGNED_USER } from '../types';

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
        default: 
            return state;
    }
}