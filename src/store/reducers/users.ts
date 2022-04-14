import { AnyAction } from 'redux'
import { ADD_NEW_USER, SIGNED_USER } from '../types';

interface UserState {
    id: number,
    login: string
}

const initialState: UserState = {
    id: 0,
    login: ''
}

export const usersReducer = (state = initialState, action: AnyAction) => {
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