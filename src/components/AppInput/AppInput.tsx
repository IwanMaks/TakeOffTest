import * as React from "react";
import { IAppInputProps } from "./AppInput.props";
import './AppInput.sass';

export const AppInput = ({type, placeholder, id, value, label, onChange}:IAppInputProps): JSX.Element => {
    return (
        <>
            <label className="app-input-label" htmlFor={id}>{label}</label>
            <input 
                autoComplete="off" 
                className="app-input-style" 
                type={type}
                placeholder={placeholder}
                id={id}
                value={value}
                onChange={onChange}
            />
        </>
        
    )
}