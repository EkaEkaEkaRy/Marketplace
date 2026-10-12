import s from "./header.module.css"
import { NavLink } from "react-router-dom"
import React from 'react';
import Log_out from './image/log-out.png'
import { useNavigate } from "react-router-dom";
import arrow from "./image/left-arrow.png"

const Header = () => {

    const navigate = useNavigate();
    const Exit = () => {
        localStorage.setItem('userId', '')
        localStorage.setItem('user_role', '')
        navigate("/*");
    }
    if (localStorage.getItem('user_role') === "1"){
        return (
            <div style={{backgroundColor: 'white'}}>
            <header className={s.head}>
            </header>
            <div className={s.exit_block}>
                <div>
                    <NavLink to={"/*"}><img src={arrow} alt="Назад" style={{width: '2.5rem', height: '2.5rem', paddingLeft: '2rem'}}/></NavLink>
                </div>
                <div onClick={Exit} style={{display: 'flex', alignItems: 'center', fontWeight: '700'}}>
                    Выход<img className={s.exit_img} src={Log_out} alt=""/>
                </div>
            </div>
            </div>
    
        )
    }
    else if (localStorage.getItem('user_role') === "2") {
        return (
            <div style={{backgroundColor: 'white'}}>
            <header className={s.head}>
            </header>
            <div className={s.exit_block}>
                <div>
                    <NavLink to={"/Bunch_sklad"}><img src={arrow} alt="Назад" style={{width: '2.5rem', height: '2.5rem', paddingLeft: '2rem'}}/></NavLink>
                </div>
                <div onClick={Exit} style={{display: 'flex', alignItems: 'center', fontWeight: '700'}}>
                    Выход<img className={s.exit_img} src={Log_out} alt=""/>
                </div>
            </div>
            </div>
    
        )
    }
    
}

export default Header