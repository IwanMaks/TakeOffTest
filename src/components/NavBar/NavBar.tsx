import * as React from "react";
import './NavBar.sass'
// @ts-expect-error
import Search from "@public/search.svg";
import { useAction } from "@utils/hooks";

export const NavBar = ():JSX.Element => {
    const [search, setSearch] = React.useState<string>('')

    const {searchContact} = useAction()

    const handleSearchClick = () => {
        searchContact({search, login: localStorage.getItem('contact-login')})
    }

    return (
        <div className="nav-bar-container">
            <div className="search-container">
                <div className="input-wrap">
                    <input className="search-input" placeholder="Имя или номер телефона..." value={search} onChange={(e) => setSearch(e.target.value)}/>
                    <Search width="30" onClick={handleSearchClick} />
                </div>
            </div>
        </div>
    )
}