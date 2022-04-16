export interface ContactType {
    name: string,
    number: string,
    id: number,
    setName: React.Dispatch<React.SetStateAction<string>>,
    setContact: React.Dispatch<React.SetStateAction<string>>,
    setEditId: React.Dispatch<React.SetStateAction<number>>,
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}