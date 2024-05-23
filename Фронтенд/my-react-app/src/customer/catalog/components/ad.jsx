import { NavLink } from "react-router-dom"
import styled from 'styled-components';
import s from "./ad.module.css"
import React from 'react';
import Sh_cart from './images/shopping-cart2.png'
import { useState } from "react";

const Ad = (props) => {
    const name = props.name
    const image = props.image
    const price = props.price
    const id = props.id
    let timer;

    const [showElement, setShowElement] = useState(false);
    const [textMessege, setTextMessege] = useState("");

    const HandlerClick = async () => {
        const user = localStorage.getItem('userId')

        const bunch = id
        const res = await fetch('http://localhost:1337/api/shopping-cart', {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type":
                "application/json" },
                body: JSON.stringify({
                    user,
                    bunch
                })
            });
        if (res.status === 201) {
            setTextMessege('Букет добавлен в корзину')
            setShowElement(true);
            timer = setTimeout(() => {
                setShowElement(false);
              }, 3000);
        } else if (res.status === 400)
            {
                setTextMessege('Букет уже в корзине')
                setShowElement(true);
                timer = setTimeout(() => {
                    setShowElement(false);
                }, 3000);
            }
    }

    return (
        <div className={s.item} id={id}>
            {showElement && (
                <div className={s.windon_mes}>
                    {textMessege}
                </div>
            )}
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