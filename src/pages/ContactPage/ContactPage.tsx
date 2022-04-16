import * as React from "react";
import { AppButton } from "@components/AppButton/AppButton";
import { ContactElem } from "@components/ContactElem/ContactElem";
import { NavBar } from "@components/NavBar/NavBar";
import { useAction, useAppSelector } from "@utils/hooks";
import './ContactPage.sass'
// @ts-expect-error
import Close from '@public/close.svg'
import { AppInput } from "@components/AppInput/AppInput";
import classNames from "classnames";
import { ContactType } from "./ContactPage.props";
import { toast } from "react-toastify";
import { AppLoading } from "@components/AppLoading/AppLoading";

export const ContactPage = (): JSX.Element => {
    const contactData = useAppSelector(state => state.contacts.contactsData)
    const loading = useAppSelector(state => state.contacts.loading)
    const login = useAppSelector(state => state.users.login) || localStorage.getItem('contact-login')
    const {loadContacts, addContact, editContact} = useAction()

    const [name, setName] = React.useState<string>('')
    const [contact, setContact] = React.useState<string>('')
    const [editId, setEditId] = React.useState<number>(0)
    const [openModal, setOpenModal] = React.useState<boolean>(false)

    const overlay = React.useRef(null)
    
    React.useEffect(() => {
        loadContacts({login})
    }, [])

    const handleConfirmButtonClick = (e:React.MouseEvent) => {
        if (!name) {
            toast.warning('Имя не может быть пустым')
        } else if (!contact) {
            toast.warning('Номер не может быть пустым')
        } else {
            if (editId) {
                editContact({id: editId, name, number:contact, login})
            } else {
                addContact({id:Math.floor(Math.random()*10000), name, number:contact, login})
            }
            setOpenModal(false)
        }
    }
    
    const handleModalClick = (e:React.MouseEvent) => {     
        setContact('')
        setName('')   
        if (openModal) {
            setOpenModal(false)
        } else {
            setOpenModal(true)
        }
    }

    return (
        <div className="contact-container">
            <div 
                ref={overlay}
                className={classNames("overlay", {dn: !openModal})} 
                onClick={(e) => {
                    if (e.target === overlay.current) {
                        setOpenModal(false)
                    }
                }}
            >
                <div className="modal-container">
                    <div className="close-wrapper">
                        <h2 className="header-modal">Введите данные контакта</h2>
                        <div className="icon-close-container" onClick={handleModalClick}>
                            <Close width="30" />
                        </div>
                    </div>
                    <AppInput 
                        placeholder="Имя" 
                        type="text"
                        id="name"
                        label="Имя контакта"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <AppInput 
                        placeholder="Телефон" 
                        type="text"
                        id="contact"
                        label="Номер контакта"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                    />
                    <AppButton text="Принять" onClick={handleConfirmButtonClick}/>
                </div>
            </div>
            
            <NavBar />
            <div className="contact-elem-wraper">
                {
                    loading ?
                    <AppLoading /> :
                    contactData ?
                    contactData.map((elem:ContactType, index:number) => <ContactElem setEditId={setEditId} setName={setName} setOpenModal={setOpenModal} setContact={setContact} id={elem.id} name={elem.name} number={elem.number} key={Math.random()*100 + index} />) :
                    <div className="empty-contact">
                        Введите свой первый контакт, нажав на кнопку ниже
                    </div>
                }
                {!loading && <AppButton text="+" className="add-number-wrapper" onClick={handleModalClick} />}
            </div>
            
        </div>
    )
}