import s from "./header.module.css"
import { NavLink } from "react-router-dom"
import React from 'react';
import Shop_cart from './images/shopping-cart.png'
import User_img from './images/user-profile.png'
import { useState } from "react";
import { useEffect } from "react";

const Header = () => {
    const [resList, SetResList] = useState()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getShoppingCart = async () => {
            const res = await fetch('http://localhost:1337/api/info-user?user=' + localStorage.getItem('userId'), {
                method: "GET"
            });
            if (res.status === 200) {
                const data = await res.json()
                SetResList(data[0]);
                setIsLoading(false)
          }}
        
          if (localStorage.getItem('userId')) getShoppingCart();
          else setIsLoading(false);
    }, [])

      if (isLoading) {
        return <div>Loading...</div>;
      }

      function coalesce(value, defaultValue) {
        return value !== undefined && value !== null && value !== "" ? value : defaultValue;
      }

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
                    <div className={s.avatar}><img src={coalesce(resList["image"], User_img)} alt="Профиль" className={s.user_img}/></div>
            </NavLink>
        </header>
    )
}

export default Header