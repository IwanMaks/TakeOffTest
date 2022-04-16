import { IContactsAction } from "@src/types/contacts";
import { Dispatch } from "react";
import { toast } from "react-toastify";
import { ADD_NEW_NUMBER, LOAD_NUMBER } from "../types";

interface NumberType {
    name: string,
    number: string,
    id?: number,
}

interface loginType {
    login: string
}

type FullNumberProps = NumberType & loginType

interface DeleteActionType {
    id:number,
    login: string
}

export const loadContacts = ({login}: {login: string}) => async (dispatch: Dispatch<IContactsAction>) => {
    const lowerLogin = login.toLocaleLowerCase()
    try {
        const response = await fetch(`http://localhost:3000/${lowerLogin}`)
        const data = await response.json()

        dispatch({
            type: LOAD_NUMBER,
            payload: data
        })
    } catch {
        toast.warning('Что-то пошло не так')
    }
}

export const addContact = ({id, name, number, login}: FullNumberProps) => async (dispatch: Dispatch<IContactsAction>) => {
    const newNumber = {
        id,
        name,
        number
    }
    const lowerLogin = login.toLocaleLowerCase()
    try {
        await fetch(`http://localhost:3000/${lowerLogin}`, {
            method: 'POST',
            body: JSON.stringify(newNumber),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        dispatch({
            type: ADD_NEW_NUMBER,
            payload: [newNumber]
        })
    } catch {
        toast.warning('Что-то пошло не так')
    }
}

export const deleteContact = ({id, login}:DeleteActionType) => async (dispatch: Dispatch<IContactsAction>) => {    
    try {
        await fetch(`http://localhost:3000/${login.toLocaleLowerCase()}/${id}`, {
            method: 'DELETE'
        })
        
        const response = await fetch(`http://localhost:3000/${login.toLocaleLowerCase()}`)
        const data = await response.json()

        dispatch({
            type: LOAD_NUMBER,
            payload: data
        })
        
    } catch {
        toast.warning('Что-то пошло не так')
    }
}

export const editContact = ({id, name, number, login}: FullNumberProps) => async (dispatch: Dispatch<IContactsAction>) => {
    try {
        const newNumber = {
            id,
            name, 
            number
        }
        await fetch(`http://localhost:3000/${login.toLocaleLowerCase()}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newNumber)
        })
        
        const response = await fetch(`http://localhost:3000/${login.toLocaleLowerCase()}`)
        const data = await response.json()

        dispatch({
            type: LOAD_NUMBER,
            payload: data
        })
    } catch {
        toast.warning('Что-то пошло не так')
    }
}

interface SearchProps {
    search: string,
    login: string
}

export const searchContact = ({search, login}: SearchProps) => async (dispatch: Dispatch<IContactsAction>) => {
    const lowerLogin = login.toLocaleLowerCase()
    try {
        const response = await fetch(`http://localhost:3000/${lowerLogin}`)
        const data = await response.json()

        if (search.trim()) {
            const filterData = data.filter((elem:NumberType, index:number) => {
                if (elem.name.includes(search.trim()) || elem.number.includes(search.trim())) {
                    return true
                } else {
                    return false
                }
            })
            dispatch({
                type: LOAD_NUMBER,
                payload: filterData
            })
        } else {
            dispatch({
                type: LOAD_NUMBER,
                payload: data
            })
        }
        

        
    } catch {
        toast.warning('Что-то пошло не так')
    }
}