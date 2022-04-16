import classNames from "classnames";
import * as React from "react";
import './AppLoading.sass';

export const AppLoading = ({size}: {size?: string}):JSX.Element => {
    return (
        <div className={classNames("lds-ring", {small: size === 'small'})}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}