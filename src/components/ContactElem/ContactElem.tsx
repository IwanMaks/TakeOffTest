import * as React from "react";
import './ContactElem.sass';

//TODO решить проблему с иконками
// @ts-expect-error
import Avatar from '../../../public/avatar.svg';
// @ts-expect-error
import Delete from '../../../public/delete.svg';
// @ts-expect-error
import Edit from '../../../public/edit.svg';
import { ContactType } from "./ContactElem.props";
import { useAction } from "@utils/hooks";

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
                <Avatar width="50" color="#fffff" />
                <div className="name-number-container">
                    <div className="name">{name}</div>
                    <div className="number">{number}</div>
                </div>
            </div>
            

            <div className="icons-container">
                <div className="icon-container" onClick={handleEditClick}>
                    <Edit  width="25" />
                </div>
                <div className="icon-container" onClick={handleDeleteClick}>
                    <Delete  width="25" />
                </div>
            </div>
        </div>
    )
}