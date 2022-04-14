import * as React from "react";
import './NavBar.sass'
// @ts-expect-error
import Search from "../../../public/search.svg";

export const NavBar = ():JSX.Element => {
    return (
        <div className="nav-bar-container">
            <div className="search-container">
                <div className="input-wrap">
                    <input className="search-input" placeholder="Имя или номер телефона..."/>
                    <Search width="30" />
                </div>
            </div>
        </div>
    )
}