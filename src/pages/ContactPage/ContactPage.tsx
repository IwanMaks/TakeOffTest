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

interface ContactType {
    name: string,
    number: string
}

export const ContactPage = (): JSX.Element => {
    const contactData = useAppSelector(state => state.contacts)
    const login = useAppSelector(state => state.users.login) || localStorage.getItem('contact-login')
    const {loadContacts} = useAction()

    const [name, setName] = React.useState<string>('')
    const [contact, setContact] = React.useState<string>('')

    React.useEffect(() => {
        loadContacts({login})
    }, [])

    console.log(contactData);
    

    return (
        <div className="contact-container">
            <div className="overlay">
                <div className="modal-container">
                    <div className="close-wrapper">
                        <div className="icon-close-container">
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
                    <AppButton />
                </div>
            </div>
            <NavBar />
            <div className="contact-elem-wraper">
                {
                    contactData ?
                    contactData.map((elem:ContactType, index:number) => <ContactElem name={elem.name} number={elem.number} key={Math.random()*100 + index} />) :
                    <div/>
                }
                <AddNumberButton />
            </div>
            
        </div>
    )
}