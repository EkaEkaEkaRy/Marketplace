import s from "./header.module.css"
import { NavLink } from "react-router-dom"
import React from 'react';

const Header = () => {

    if (!localStorage.getItem('userId'))
    return (
        <header className={s.head}>
            <NavLink to="/Login"> 
                <div>
                    Вход/Регистрация
                </div>
            </NavLink>
        </header>
    )
    else
    
    return (
        <header className={s.head}>
            <NavLink to="/Profile"> 
                <div>
                    <img src={"profile"} alt="Корзина" />
                </div>
            </NavLink>
            <NavLink to="/Profile"> 
                <div>
                    <img src={"profile"} alt="Профиль" />
                </div>
            </NavLink>
        </header>
    )
}

export default Header