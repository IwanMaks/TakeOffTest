export interface IUserState {
    login: string,
    id: number
}

export interface IUserAction {
    type: string,
    payload?: IUserState 
}