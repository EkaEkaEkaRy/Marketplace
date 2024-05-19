import { useNavigate } from "react-router-dom";
import Header from "../header/header"
import Manu from "./components/manu"
import s from "./orders.module.css"
import React from 'react';

const Orders = () => {
    const navigate = useNavigate()

    if (localStorage.getItem('user_role') === '2')
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
    else navigate("/Login")
}

export default Orders