import * as React from "react";
import { ContactElem } from "../../components/ContactElem/ContactElem";
import { NavBar } from "../../components/NavBar/NavBar";
import './ContactPage.sass'

export const ContactPage = (): JSX.Element => {
    return (
        <div className="contact-container">
            <NavBar />
            <div className="contact-elem-wraper">
                <ContactElem />
                <ContactElem />
                <ContactElem />
                <ContactElem />
            </div>
        </div>
    )
}