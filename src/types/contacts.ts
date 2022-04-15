export interface contactState {
    id: number,
    name: string,
    number: string
}

export interface IContactsAction {
    type: string,
    payload?: contactState[]
}