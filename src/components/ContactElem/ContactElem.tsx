import * as React from "react";
import './ContactElem.sass';

import { ContactType } from "./ContactElem.props";
import { useAction } from "@utils/hooks";
import { FaUserAlt } from 'react-icons/fa'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'

export const ContactElem = ({name, number, id, setEditId, setContact, setName, setOpenModal}: ContactType):JSX.Element => {
    const {deleteContact} = useAction()

    const handleDeleteClick = () => { 
        deleteContact({id, login:localStorage.getItem('contact-login')})
    }

    const handleEditClick = () => {
        setOpenModal(true)
        setName(name)
        setContact(number)
        setEditId(id)
    }

    return (
        <div className="contact-elem-container">
            <div className="info-container">
                <FaUserAlt className="icon-avatar"/>
                <div className="name-number-container">
                    <div className="name">{name}</div>
                    <div className="number">{number}</div>
                </div>
            </div>
            

            <div className="icons-container">
                <div className="icon-container edit" onClick={handleEditClick}>
                    <AiFillEdit fontSize="20px"/>
                </div>
                <div className="icon-container delete" onClick={handleDeleteClick}>
                    <AiFillDelete fontSize="20px"/>
                </div>
            </div>
        </div>
    )
}