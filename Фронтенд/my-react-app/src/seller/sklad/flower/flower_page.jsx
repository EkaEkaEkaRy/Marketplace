import Header from "../header/header"
import Manu from "./components/manu"
import Items from "./components/items"
import s from "./flower_page.module.css"
import { NavLink, useNavigate } from "react-router-dom"
import React from 'react';
//import { useState } from "react";
import plus from "./components/images/add.png"


const Flower_sklad = () => {
    const navigate = useNavigate()

    const getFlowers = async () => {
        const res = await fetch('http://localhost:1337/api/flower?id=' + localStorage.getItem('userId'), {
            method: "GET"
        });
        if (res.ok) {
            const data = await res.json()
            localStorage.setItem('list_of_flowers', JSON.stringify(data))
        }
    }

    getFlowers();

    if (localStorage.getItem('user_role') === '2'){
        let rest_list = JSON.parse(localStorage.getItem('list_of_flowers'));
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
                        <button className={s.button}><img src={plus} className={s.plus} alt=""></img>Создать</button>
                    </NavLink>
                </div>
                <div className={s.items}>
                        {rest_list && rest_list.map(element => {
                                return (
                                <Items name = {element['name']} image = {element["image"]} count = {element["count"]} price = {element["cost"]} id = {element["id"]}/>
                        )})}
                </div>
                </main>
            </div>
        )}
    else navigate("/Login")
}

export default Flower_sklad