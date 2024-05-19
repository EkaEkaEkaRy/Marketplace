import DeliverForm from "./components/deliver"
import Items from "./components/items"
import Header from "../catalog/components/header";
import s from "./shopping_cart.module.css"
import React from 'react';
import { useNavigate } from "react-router-dom";

const Shopping_cart = () => {
    const navigate = useNavigate()

    if (localStorage.getItem('user_role') !== '2')
    return (
      <div className={s.app_wrapper}>
        <Header/>
      <main className={s.main}>
        <div>Корзина</div>
        <div className={s.item}>
          <div className={s.wrapper}>
            <DeliverForm />
            <Items />
          </div>
        </div>
      </main>
    </div>
    )
    else navigate("/Login")
  }
export default Shopping_cart