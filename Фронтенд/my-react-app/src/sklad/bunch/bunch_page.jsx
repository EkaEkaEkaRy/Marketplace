import Header from "./components/header"
import Manu from "./components/manu"
import s from "./bunch_page.module.css"
import { NavLink } from "react-router-dom"
import React from 'react';
//import { useState } from "react";
import plus from "./components/images/add.png"

const Bunch_sklad = () => {

    return (
        <div className={s.back}>
            <div>
                <Header/>
            </div>
            <main>
            
            <div>
                <Manu/>
            </div>
            <div>
                <NavLink to="/Bunch_sklad/Create">
                    <button className={s.button}><img src={plus} className={s.plus}></img>Создать</button>
                </NavLink>
            </div>
            </main>
        </div>
    )
}

export default Bunch_sklad