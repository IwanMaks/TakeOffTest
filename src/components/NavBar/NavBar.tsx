import * as React from "react";
import './NavBar.sass'
// @ts-expect-error
import Search from "@public/search.svg";
// @ts-expect-error
import Exit from "@public/exit.svg";
import { useAction } from "@utils/hooks";
import { useNavigate } from "react-router-dom";

export const NavBar = ():JSX.Element => {
    const [search, setSearch] = React.useState<string>('')

    const {searchContact, exitUser} = useAction()
    const navigate = useNavigate()

    const handleSearchClick = () => {
        searchContact({search, login: localStorage.getItem('contact-login')})
    }

    const handleExitClick = () => {
        localStorage.removeItem('contact-login')
        exitUser()
        navigate('/')
    }

    return (
        <div className="nav-bar-container">
            <div className="search-container">
                <div className="input-wrap">
                    <input className="search-input" placeholder="Имя или номер телефона..." value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <Search width="30" onClick={handleSearchClick} className="search-icon"/>
                </div>
            </div>
            <div className="exit-button-wrap" onClick={handleExitClick}>
                <Exit width="30" className="exit-button"/>
            </div>
        </div>
    )
}