import DeliverForm from "./components/deliver"
import Items from "./components/items"
import Header from "../catalog/components/header";
import s from "./shopping_cart.module.css"
import React from 'react';

const Shopping_cart = () => {
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
  }
export default Shopping_cart