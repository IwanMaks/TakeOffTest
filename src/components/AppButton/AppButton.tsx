import * as React from "react";
import { IAppButtonProps } from "./AppButton.props";
import './AppButton.sass';

export const AppButton = ({onClick, text, className}:IAppButtonProps):JSX.Element => {
    return (
        <div className={className ? className : "app-button"} onClick={onClick}>
            {text}
        </div>
    )
}