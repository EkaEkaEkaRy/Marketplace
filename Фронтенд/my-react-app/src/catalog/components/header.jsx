import s from "./header.module.css"
import { NavLink } from "react-router-dom"
import React from 'react';
import Shop_cart from './images/shopping-cart.png'

const Header = () => {
    console.log(localStorage.getItem('userId'))
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
                    <img src={Shop_cart} alt="Корзина" className={s.sh_cart}/>
            </NavLink>
            <NavLink to="/Profile"> 
                    <img src={"profile"} alt="Профиль" />
            </NavLink>
        </header>
    )
}

export default Header