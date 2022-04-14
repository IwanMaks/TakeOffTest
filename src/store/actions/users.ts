import { toast } from "react-toastify"
import { AppDispatch } from ".."
import { ADD_NEW_USER, SIGNED_USER } from "../types"

interface UserObj {
    id: number,
    login: string,
    password: string
  }

export const signedUser = (user:UserObj) => async (dispatch:AppDispatch) => {
    dispatch({
        type: SIGNED_USER,
        payload: user
    })
}

export const addNewUser = (user:UserObj) => async (dispatch:AppDispatch) => {
    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        dispatch({
            type: SIGNED_USER,
            payload: user
        })
    } catch {
        toast.error('Что-то пошло не так')
    }
}