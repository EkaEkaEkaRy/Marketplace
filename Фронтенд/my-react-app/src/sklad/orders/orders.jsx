import Header from "../header/header"
import Manu from "./components/manu"
import s from "./orders.module.css"
import React from 'react';

const Orders = () => {
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

export default Orders