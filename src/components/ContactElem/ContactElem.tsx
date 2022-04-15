import * as React from "react";
import './ContactElem.sass';
// @ts-expect-error
import Avatar from '../../../public/avatar.svg';
// @ts-expect-error
import Delete from '../../../public/delete.svg';
// @ts-expect-error
import Edit from '../../../public/edit.svg';

interface ContactType {
    name: string,
    number: string
}

export const ContactElem = ({name, number}: ContactType):JSX.Element => {


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
                <div className="icon-container">
                    <Edit  width="25" />
                </div>
                <div className="icon-container">
                    <Delete  width="25" />
                </div>
            </div>
        </div>
    )
}