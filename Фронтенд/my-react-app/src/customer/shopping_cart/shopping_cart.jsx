import DeliverForm from "./components/deliver"
import Items from "./components/items"
import Header from "../catalog/components/header";
import s from "./shopping_cart.module.css"
//import React, { useState } from 'react';
//import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";


import arrow from './components/image/left-arrow.png'

const Shopping_cart = () => {
    //const navigate = useNavigate()

    if (localStorage.getItem('user_role') !== '1'){
      return <Navigate to="/Login" />
    }
      
    return (
      <div className={s.app_wrapper}>
        <Header/>
      <main className={s.main}>
      <NavLink to="/*"><img src={arrow} alt="Назад" style={{width: '2.5rem', height: '2.5rem', paddingTop: '2rem', paddingLeft: '2rem'}}/></NavLink>
      <div className={s.title}>Корзина</div>
        <div className={s.item}>
          <div className={s.wrapper}>
            <DeliverForm/>
            <Items/>
          </div>
        </div>
      </main>
    </div>
    )
  }
export default Shopping_cart