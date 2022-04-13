import { AppDispatch } from ".."
import { SIGNED_USER } from "../types"

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