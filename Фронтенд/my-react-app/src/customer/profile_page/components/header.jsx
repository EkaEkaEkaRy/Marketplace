import s from "./header.module.css"
//import { NavLink } from "react-router-dom"
import React from 'react';
import Log_out from './image/log-out.png'
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const Exit = () => {
        localStorage.setItem('userId', '')
        navigate("/*");
    }

    console.log(localStorage.getItem('userId'))
    return (
        <div style={{backgroundColor: 'white'}}>
        <header className={s.head}>
        </header>
            <div onClick={Exit} className={s.exit_block}>
                Выход<img className={s.exit_img} src={Log_out} alt=""/>
            </div>
        </div>

    )
}

export default Header