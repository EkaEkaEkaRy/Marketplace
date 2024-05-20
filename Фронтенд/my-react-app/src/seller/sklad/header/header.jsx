import s from "./header.module.css"
import { NavLink } from "react-router-dom"
import React from 'react';

const Header = () => {
    return (
        <header className={s.head}>
            <NavLink to="/Profile"> 
                <div>
                    <img src={"profile"} alt="Профиль" />
                </div>
            </NavLink>
        </header>
    )
}

export default Header