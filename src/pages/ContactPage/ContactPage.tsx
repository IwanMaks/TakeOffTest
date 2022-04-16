import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddNumberButton } from "../../components/AddNumberButton/AddNumberButton";
import { AppButton } from "../../components/AppButton/AppButton";
import { ContactElem } from "../../components/ContactElem/ContactElem";
import { NavBar } from "../../components/NavBar/NavBar";
import { useAction, useAppSelector } from "../../utils/hooks";
import { RootState } from "../../store";
import { loadContacts } from "../../store/actions/contacts";
import './ContactPage.sass'
// @ts-expect-error
import Close from '../../../public/close.svg'
import { AppInput } from "@src/components/AppInput/AppInput";
import classNames from "classnames";
import { ContactType } from "./ContactPage.props";

export const ContactPage = (): JSX.Element => {
    const contactData = useAppSelector(state => state.contacts)
    const login = useAppSelector(state => state.users.login) || localStorage.getItem('contact-login')
    const {loadContacts, addContact} = useAction()

    const [name, setName] = React.useState<string>('')
    const [contact, setContact] = React.useState<string>('')
    const [openModal, setOpenModal] = React.useState<boolean>(false)

    const overlay = React.useRef(null)
    
    React.useEffect(() => {
        loadContacts({login})
    }, [])

    const handleConfirmButtonClick = (e:React.MouseEvent) => {
        addContact({id:Math.floor(Math.random()*10000), name, number:contact, login})
        setOpenModal(false)
    }
    
    const handleModalClick = (e:React.MouseEvent) => {        
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
                    contactData ?
                    contactData.map((elem:ContactType, index:number) => <ContactElem id={elem.id} name={elem.name} number={elem.number} key={Math.random()*100 + index} />) :
                    <div/>
                }
                <AppButton text="+" className="add-number-wrapper" onClick={handleModalClick} />
            </div>
            
        </div>
    )
}