import { IUserAction } from "@src/types/user"
import { Dispatch } from "react"
import { toast } from "react-toastify"
import { END_LOADING, EXIT_USER, SIGNED_USER, START_LOADING } from "../types"
import { useNavigate } from "react-router-dom";

interface UserObj {
    id: number,
    login: string,
    password: string
}

interface ActionProps {
    login: string | '',
    password: string | '',
    confirmPassword?: string | '',
    navigation: any //TODO что-то сделать с any
}

export const exitUser = () => (dispatch: Dispatch<IUserAction>) => {
    dispatch({
        type: EXIT_USER
    })
}

export const addNewUser = ({password, confirmPassword, login, navigation}: ActionProps) => async (dispatch: Dispatch<IUserAction>) => {
    try {
        dispatch({type: START_LOADING})
        const response = await fetch('http://localhost:3000/users')
        const data = await response.json()
        let mark = 0
        if (password === confirmPassword) {
            data.forEach((elem:UserObj) => {
                if (elem.login === login) {
                    dispatch({type: END_LOADING})
                    toast.warning('Пользователь с таким логином уже существует')
                    mark = 1
                }
            })
            if (mark === 0) {
                const user = {
                    login: login,
                    password: password,
                    id: data.length + 1
                }

                await fetch('http://localhost:3000/users', {
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
                localStorage.setItem('contact-login', login)
                
                navigation('/contacts')
            }
        } else {
            dispatch({type: END_LOADING})
            toast.error('Пароли не совпадают')
        }
    } catch {
        dispatch({type: END_LOADING})
        toast.error('Что-то пошло не так')
    }
}

export const signedUser = ({login, password, navigation}: ActionProps) => async (dispatch: Dispatch<IUserAction>) => {
    try {
        dispatch({type: START_LOADING})
        const response = await fetch('http://localhost:3000/users')
        const data = await response.json()
        let mark = 0
        data.forEach((elem:UserObj) => {
            if (elem.login === login && elem.password !== password) {
                dispatch({type: END_LOADING})
                toast.error('Пароль не совпадает')
                mark = 1
            } else if (elem.login === login && elem.password === password) {
                const user = {
                    login: login, 
                    id:elem.id
                }
                dispatch({
                    type: SIGNED_USER,
                    payload: user
                })

                localStorage.setItem('contact-login', login)
                navigation('/contacts')
                mark = 1
            }
        })
        
        if (!mark) {
            dispatch({type: END_LOADING})
            toast.warning('Пользоватлель не найден')
        }
    } catch (e) {
        dispatch({type: END_LOADING})
        toast.error('Что-то пошло не так')
    }
}

