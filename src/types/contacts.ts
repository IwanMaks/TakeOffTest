export interface contactState {
    id: number,
    name: string,
    number: string,
    login: string
}

export interface FullContactState {
    loading: boolean,
    contactsData: contactState[]
}

export interface IContactsAction {
    type: string,
    payload?: contactState[]
}