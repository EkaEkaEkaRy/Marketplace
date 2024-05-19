import { NavLink } from "react-router-dom"
import s from "./item.module.css"
import React from 'react';

const Item = (props) => {
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
        </div>
        </NavLink>
        </div>
    )
}

export default Item