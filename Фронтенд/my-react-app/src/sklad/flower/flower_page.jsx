import Header from "./components/header"
import Manu from "./components/manu"
import s from "./flower_page.module.css"
import React from 'react';

const Flower_sklad = () => {
    return (
        <div className={s.back}>
            <div>
                <Header/>
            </div>
            <div>
                <Manu/>
            </div>
        </div>
    )
}

export default Flower_sklad