import { NavLink } from "react-router-dom"
import s from "./ad.module.css"
import React from 'react';
import Sh_cart from './images/shopping-cart2.png'

const Ad = (props) => {
    const name = props.name
    const image = props.image
    const price = props.price
    const id = props.id

    const HandlerClick = async () => {
        const user = localStorage.getItem('userId')
        console.log(user)
        const bunch = id
        console.log(bunch)
        const res = await fetch('http://localhost:1337/api/shopping-cart', {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type":
                "application/json" },
                body: JSON.stringify({
                    user,
                    bunch
                })
            });
            if (res.ok) console.log("Добавлено в корзину")
    }

    return (
        <div className={s.item} id={id}>
        
        <div className={s.back}>
            <NavLink to = {"/Bunch?id=" + id} style={{textDecoration: "none"}}>
            <div className={s.image_position}><img src={image} alt="Фото букета" className={s.flower_image}/></div>
            <div className={s.text_position}>
                <div className={s.text_name}>{name}</div>
                <div>Цена: {price} ₽</div>
            </div>
            </NavLink>
            <div className={s.navlink} onClick={HandlerClick}>
                <img src={Sh_cart} alt="Корзина" className={s.icon_sh}/>
            </div>
        </div>
        </div>
    )
}

export default Ad