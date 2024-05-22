import Header from "../header/header"
import Manu from "./components/manu"
import Items from "./components/items"
import s from "./flower_page.module.css"
import { NavLink, Navigate } from "react-router-dom"
import React from 'react';
//import { useState } from "react";
import plus from "./components/images/add.png"
import { useState } from "react"
import { useEffect } from "react"


const Flower_sklad = () => {

    const [resList, SetResList] = useState()
    const [isLoading, setIsLoading] = useState(true);

    useEffect (() => {

        const getFlowers = async () => {
            const res = await fetch('http://localhost:1337/api/flower?id=' + localStorage.getItem('userId'), {
                method: "GET"
            });
            if (res.ok) {
                const data = await res.json()
                SetResList(data);
                setIsLoading(false)
            }
        }
    
        getFlowers();
      }, [])


    if (localStorage.getItem('user_role') !== '2'){
        return <Navigate to="/Login" />
    }
    if (isLoading) {
        return <div>Loading...</div>;
    }

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
                    <NavLink to="/Flower_sklad/Create" style={{textDecoration: 'none'}}>
                        <button className={s.button}><img src={plus} className={s.plus} alt=""></img>Создать</button>
                    </NavLink>
                </div>
                <div className={s.items}>
                        {resList && resList.map(element => {
                                return (
                                <Items name = {element['name']} image = {element["image"]} count = {element["count"]} price = {element["cost"]} id = {element["id"]}/>
                        )})}
                </div>
                </main>
            </div>
        )
}

export default Flower_sklad