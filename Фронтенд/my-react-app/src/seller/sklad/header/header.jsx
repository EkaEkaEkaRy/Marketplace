import s from "./header.module.css"
import { NavLink } from "react-router-dom"
import React from 'react';
import { useState } from "react";
import { useEffect } from "react";
import User_img from "./user-profile.png"

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


    return (
        <header className={s.head}>
            <NavLink to="/Profile"> 
                    <div className={s.avatar}><img src={coalesce(resList["image"], User_img)} alt="Профиль" className={s.user_img}/></div>
            </NavLink>
        </header>
    )
}

export default Header