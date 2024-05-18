import Header from "../header/header"
import Manu from "./components/manu"
import s from "./flower_page.module.css"
import { NavLink } from "react-router-dom"
import React from 'react';
//import { useState } from "react";
import plus from "./components/images/add.png"
const Flower_sklad = () => {

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
                <NavLink to="/Flower_sklad/Create">
                    <button className={s.button}><img src={plus} className={s.plus}></img>Создать</button>
                </NavLink>
            </div>
            </main>
        </div>
    )
}

export default Flower_sklad