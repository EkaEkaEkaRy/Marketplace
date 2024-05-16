import Header from "./components/header"
import Manu from "./components/manu"
import s from "./bunch_page.module.css"
import { NavLink } from "react-router-dom"
import React from 'react';

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
                <NavLink>
                    <button className={s.button}><img src={"image.png"}></img>Создать</button>
                </NavLink>
            </div>
            </main>
        </div>
    )
}

export default Bunch_sklad