import { NavLink } from "react-router-dom"
import s from "./manu.module.css"
import React from 'react';

const Manu = () => {
    return(
        <div className={s.manu}>
            <NavLink to="/Bunch_sklad" className={s.text_menu} style={{fontWeight: 'bold'}}>Букеты</NavLink>|
            <NavLink to="/Flower_sklad" className={s.text_menu}>Цветы</NavLink>|
            <NavLink to="/Orders" className={s.text_menu}>Заказы</NavLink>
        </div>
    )
}

export default Manu