//import { useNavigate } from "react-router-dom";
import Header from "../header/header"
import Manu from "./components/manu"
import s from "./orders.module.css"
import React from 'react';
import { Navigate } from "react-router-dom";

const Orders = () => {
    //const navigate = useNavigate()

    if (localStorage.getItem('user_role') !== '2'){
        return <Navigate to="/Login" />
    }
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