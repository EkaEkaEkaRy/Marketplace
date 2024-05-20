import { NavLink } from "react-router-dom"
import s from "./items.module.css"
import React from 'react';

const Items = (props) => {
    const name = props.name
    const image = props.image
    const price = props.price
    const count = props.count
    const id = props.id

    return (
        <div className={s.item} id = {id}>
        <NavLink style={{textDecoration: "none"}}>
        <div className={s.back}>
            <div className={s.image_position}><img src={image} alt="Фото цветка" className={s.flower_image}/></div>
            <div className={s.text_position}>
                <div style={{fontSize: '18px', marginBottom: '0.2rem'}}>{name}</div>
                <div>Цена: {price}</div>
                <div>Количество: {count}</div>
            </div>
        </div>
        </NavLink>
        </div>
    )
}

export default Items