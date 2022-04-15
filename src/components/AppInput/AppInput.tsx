import * as React from "react";
import { AppInputProps } from "./AppInput.props";
import './AppInput.sass';

export const AppInput = ({placeholder}:AppInputProps): JSX.Element => {
    return (
        <input
            className="app-input"
            placeholder={placeholder}
        />
    )
}