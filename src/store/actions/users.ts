import { IUserAction } from "@src/types/user"
import { Dispatch } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AppDispatch } from ".."
import { SIGNED_USER } from "../types"

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

export const addNewUser = ({password, confirmPassword, login, navigation}: ActionProps) => async (dispatch: Dispatch<IUserAction>) => {
    try {
        const response = await fetch('http://localhost:3000/users')
        const data = await response.json()
        let mark = 0
        if (password === confirmPassword) {
            data.forEach((elem:UserObj) => {
                if (elem.login === login) {
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
            toast.error('Пароли не совпадают')
        }
    } catch {
        toast.error('Что-то пошло не так')
    }
}

export const signedUser = ({login, password, navigation}: ActionProps) => async (dispatch: Dispatch<IUserAction>) => {
    try {
        const response = await fetch('http://localhost:3000/users')
        const data = await response.json()
        let mark = 0
        data.forEach((elem:UserObj) => {
            if (elem.login === login && elem.password !== password) {
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
            toast.warning('Пользоватлель не найден')
        }
    } catch (e) {
        toast.error('Что-то пошло не так')
    }
}
