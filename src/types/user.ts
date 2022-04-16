export interface IUserState {
    login: string,
    id: number,
    loading?: boolean
}

export interface IUserAction {
    type: string,
    payload?: IUserState 
}