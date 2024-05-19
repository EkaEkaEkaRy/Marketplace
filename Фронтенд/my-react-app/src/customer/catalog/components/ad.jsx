import { NavLink } from "react-router-dom"
import s from "./ad.module.css"
import React from 'react';
import Sh_cart from './images/shopping-cart2.png'

const Ad = (props) => {
    const name = props.name
    const image = props.image
    const price = props.price

    return (
        <div className={s.item}>
        <NavLink to = "/Bunch">
        <div className={s.back}>
            <div ><img src={image} alt="Фото букета"/></div>
            <div>
                <div>{name}</div>
                <div>Цена: {price}</div>
            </div>
            <div className={s.navlink}>
                <NavLink to="/Booking">
                    <img src={Sh_cart} alt="Корзина" className={s.icon_sh}/>
                </NavLink>

            </div>
        </div>
        </NavLink>
        </div>
    )
}

export default Ad