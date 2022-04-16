import { FullContactState, IContactsAction } from '@src/types/contacts';
import { ADD_NEW_NUMBER, LOAD_NUMBER, START_LOADING, END_LOADING } from '../types';

const initialState: FullContactState = {
    loading: false,
    contactsData: []
}

export const contactsReducer = (state = initialState, action: IContactsAction):FullContactState => {
    switch (action.type) {
        case LOAD_NUMBER:
            return {
                loading: false,
                contactsData: [...action.payload]
            }
        case ADD_NEW_NUMBER:
            return {
                loading: false,
                contactsData: [
                    ...state.contactsData,
                    {   
                        number: action.payload[0].number,
                        name: action.payload[0].name,
                        id: state.contactsData.length + 1
                    }
                ]
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