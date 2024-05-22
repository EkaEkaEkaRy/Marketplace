import { NavLink } from "react-router-dom"
import s from "./items.module.css"
import React from 'react';

const Items = (props) => {
    const name = props.name
    const image = props.image
    const price = props.price
    const id = props.id
    const flowers = props.flowers
    const description = props.description

    return (
        <div className={s.item} id = {id}>
        <NavLink to ={"/Bunch_sklad/Create?id=" + id + "&name=" + name + "&flowers=" + flowers + "&description=" + description} style={{textDecoration: "none"}}>
        <div className={s.back}>
            <div className={s.image_position}><img src={image} alt="Фото букета" className={s.flower_image}/></div>
            <div className={s.text_position}>
                <div className={s.text_name}>{name}</div>
                <div>Цена: {price} ₽</div>
            </div>
        </div>
        </NavLink>
        </div>
    )
}

export default Items