import { AnyAction } from 'redux'
import { ADD_NEW_NUMBER, LOAD_NUMBER } from '../types';

interface contactState {
    id: number,
    name: string,
    number: string
}

const initialState: Array<contactState> = []

export const contactsReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case LOAD_NUMBER:
            return [
                ...state,
                action.payload
            ]
        case ADD_NEW_NUMBER:
            return [
                ...state,
                {
                    number: action.payload.number,
                    name: action.payload.name,
                    id: state.length + 1
                }
            ]
        default:
            return state;
    }
}