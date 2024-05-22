import s from "./header.module.css"
import { NavLink } from "react-router-dom"
import React from 'react';
import Shop_cart from './images/shopping-cart.png'
import User_img from './images/user-profile.png'

const Header = () => {
    if (!localStorage.getItem('userId'))
    return (
        <header className={s.head}>
            <NavLink to="/Login" style={{textDecoration: 'none'}}> 
                <div className={s.head_text}>
                    Вход/Регистрация
                </div>
            </NavLink>
        </header>
    )
    else
    
    return (
        <header className={s.head}>
            <NavLink to="/Shopping_cart"> 
                    <img src={Shop_cart} alt="Корзина" className={s.sh_cart}/>
            </NavLink>
            <NavLink to="/Profile"> 
                    <div className={s.avatar}><img src={User_img} alt="Профиль" className={s.user_img}/></div>
            </NavLink>
        </header>
    )
}

export default Header