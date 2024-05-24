import { NavLink } from "react-router-dom"
import s from "./items.module.css"
import React from 'react';

const Items = (props) => {
    const id = props.id
    const name = props.name
    const count = props.count
    const image = props.image
    const price = props.cost

    /*
    bunches: '[{"id":10,"name":"Букет из подсолнухов","count":"3","image":"http://localhost:1337/images/bunches/1716327655935-886657636-26sjvpde6wcvko7syfmagxydi17wqalt.jpg","sum":"2590"},{"id":12,"name":"Букет из кустовых хризантем","count":"1","image":"http://localhost:1337/images/bunches/1716406632560-4029619-nowm_03-_-2024_01_15T190530.376.jpg","cost":"5600"}]'
    */

    return (
        <div className={s.item} id = {id}>
        <NavLink to ={"/Bunch?id=" + id} style={{textDecoration: "none"}}>
        <div className={s.back}>
            <div className={s.image_position}><img src={image} alt="Фото букета" className={s.flower_image}/></div>
            <div className={s.text_position}>
                <div className={s.text_name}>{name}</div>
                <div className={s.text}>Цена: {price} ₽</div>
                <div className={s.text}>Количество: {count}</div>
            </div>
        </div>
        </NavLink>
        </div>
    )
}

export default Items