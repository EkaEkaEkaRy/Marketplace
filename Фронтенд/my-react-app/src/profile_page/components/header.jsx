import s from "./header.module.css"
import { NavLink } from "react-router-dom"
import React from 'react';
import left from './arrow-left.png'
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const Exit = () => {
        localStorage.setItem('userId', '')
        navigate("/*");
    }

    console.log(localStorage.getItem('userId'))
    return (
        <div>
        <header className={s.head}>
        </header>
        <div className={s.exit_block}>
            <div>
                <NavLink to="/Main">
                    <div className={s.back}>
                        <img className={s.arrow} src={left} alt="Назад" />
                    </div>
                </NavLink>
            </div>
            <div onClick={Exit}>
                Выход
            </div>
            </div>
        </div>

    )
}

export default Header