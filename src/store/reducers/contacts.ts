import { contactState, IContactsAction } from '@src/types/contacts';
import { ADD_NEW_NUMBER, LOAD_NUMBER } from '../types';

const initialState: Array<contactState> = []

export const contactsReducer = (state = initialState, action: IContactsAction):Array<contactState> => {
    switch (action.type) {
        case LOAD_NUMBER:
            return [
                ...state,
                ...action.payload
            ]
        case ADD_NEW_NUMBER:
            return [
                ...state,
                {   
                    number: action.payload[0].number,
                    name: action.payload[0].name,
                    id: state.length + 1
                }
            ]
        default:
            return state;
    }
}