import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddNumberButton } from "../../components/AddNumberButton/AddNumberButton";
import { AppButton } from "../../components/AppButton/AppButton";
import { AppInput } from "../../components/AppInput/AppInput";
import { ContactElem } from "../../components/ContactElem/ContactElem";
import { NavBar } from "../../components/NavBar/NavBar";
import { useAppSelector } from "../../hooks";
import { RootState } from "../../store";
import { loadContacts } from "../../store/actions/contacts";
import './ContactPage.sass'
// @ts-expect-error
import Close from '../../../public/close.svg'

interface ContactType {
    name: string,
    number: string
}

export const ContactPage = (): JSX.Element => {
    const dispatch = useDispatch()
    const userId = useAppSelector(state => state.users.id)
    const contactData = useAppSelector(state => state.contacts)

    console.log(contactData[0]);
    

    React.useEffect(() => {
        dispatch(loadContacts())
    }, [])

    return (
        <div className="contact-container">
            <div className="overlay">
                <div className="modal-container">
                    <div className="close-wrapper">
                        <div className="icon-close-container">
                            <Close width="30" />
                        </div>
                    </div>
                    <AppInput placeholder="Имя" />
                    <AppInput placeholder="Телефон" />
                    <AppButton />
                </div>
            </div>
            <NavBar />
            <div className="contact-elem-wraper">
                {
                    contactData[0] ?
                    contactData[0].map((elem:ContactType, index:number) => <ContactElem name={elem.name} number={elem.number} key={Math.random()*100 + index} />) :
                    <div/>
                }
                <AddNumberButton />
            </div>
            
        </div>
    )
}