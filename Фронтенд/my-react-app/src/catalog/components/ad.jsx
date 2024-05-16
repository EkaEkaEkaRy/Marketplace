import { NavLink } from "react-router-dom"
import s from "./ad.module.css"
import React from 'react';

const Ad = (props) => {
    const name = props.name
    const image = props.image
    const price = props.price

    return (
        <NavLink to = "/Bunch">
        <div className={s.back}>
            <div ><img src={image} alt="Фото букета"/></div>
            <div>
                <div>{name}</div>
                <div>Цена: {price}</div>
            </div>
            <div>
                <NavLink to="/Booking">
                    <img src={"image"} alt="Корзина"/>
                </NavLink>

            </div>
        </div>
        </NavLink>
    )
}

export default Ad