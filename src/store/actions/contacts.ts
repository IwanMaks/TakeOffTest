import { toast } from "react-toastify";
import { AppDispatch, RootState } from "..";
import { ADD_NEW_NUMBER, LOAD_NUMBER } from "../types";

interface NumberType {
    name: string,
    number: string,
    id: number
}

export const loadContacts = () => async (dispatch:AppDispatch) => {
    try {
        const response = await fetch('http://localhost:3000/contacts')
        const data = await response.json()

        dispatch({
            type: LOAD_NUMBER,
            payload: data[1]
        })
    } catch {
        toast.warning('Что-то пошло не так')
    }
    
    
}

export const addContact = (newNumber: NumberType) => async (dispatch:AppDispatch) => {
    dispatch({
        type: ADD_NEW_NUMBER,
        payload: newNumber
    })
}