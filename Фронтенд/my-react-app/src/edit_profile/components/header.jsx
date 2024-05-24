import s from "./header.module.css"
import { NavLink } from "react-router-dom"
import React from 'react';
import { useNavigate } from "react-router-dom";

const Header = () => {

    return (
        <div style={{backgroundColor: 'white'}}>
        <header className={s.head}>
        </header>
        </div>

    )
}

export default Header