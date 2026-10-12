import Header from "../header/header"
import Manu from "./components/manu"
import Items from "./components/items"
import s from "./bunch_page.module.css"
import { NavLink } from "react-router-dom"
import React, { useState } from 'react';
//import { useState } from "react";
import plus from "./components/images/add.png"
import { Navigate } from "react-router-dom"
import { useEffect } from "react"

const Bunch_sklad = () => {

    const [resList, SetResList] = useState()
    const [isLoading, setIsLoading] = useState(true);

    useEffect (() => {
        const getBunchs = async () => {
                const res = await fetch('http://localhost:1337/api/bunch?user=' + localStorage.getItem('userId'), {
                    method: "GET"
                });
                if (res.ok) {
                    const data = await res.json()
                    SetResList(data);
                    setIsLoading(false)
                }
        }
    
        getBunchs();
      }, [])
    
    
    if (localStorage.getItem('user_role') !== '2'){
        return <Navigate to="/Login" />
    }

    if (isLoading) {
        return <div>Loading...</div>;
      }

    //let rest_list = JSON.parse(localStorage.getItem('list_of_bunch_from_sklad'));
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
                <NavLink to="/Bunch_sklad/Create" style={{textDecoration: 'none'}}>
                    <button className={s.button}><img src={plus} className={s.plus} alt=""></img>Создать</button>
                </NavLink>
            </div>
            <div className={s.items}>
                        {resList && resList.map(element => {
                                return (
                                <Items name = {element['name']} image = {element["image"]} price = {element["cost"]} id = {element["id"]} flowers={element['flowers']} description={element['description']}/>
                        )})}
                </div>
            </main>
        </div>
    )
}

export default Bunch_sklad