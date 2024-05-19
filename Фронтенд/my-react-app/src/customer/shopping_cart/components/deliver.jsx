import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import s from "./deliver.module.css"
import React from 'react';

const DeliverForm = () => {

    //const navigate = useNavigate();
    /*
    const [authenticated, setauthenticated] = useState(
        localStorage.getItem(localStorage.getItem("authenticated") || false));
    */
    
    let [user, setuser] = useState({
        address: "",
        date: "",
        time: "",
        comment: ""
    })

    let name, value;


    const handlerChange = (event) => {
        name = event.target.name;
        value = event.target.value;
        setuser({ ...user, [name]: value })
    }


    const handlerSubmit = async (event) => {
        /* 
        event.preventDefault();
        const {login, password} = user;
        const res = await fetch('http://localhost:1337/api/find-user?mail=' + login + '&password=' + password, {
            method: "GET",
            headers: { "Accept": "application/json", "Content-Type":
            "application/json" }
        });
        const data = await res.json();
        if (res.status === 404 || !data) document.getElementById("answer_for_user_login").innerHTML = "пользователя не существует";
        else if (res.status === 400) document.getElementById("answer_for_user_login").innerHTML ="неверный пароль";
        else {
            //setauthenticated(true)
            //localStorage.setItem("authenticated", true);
            localStorage.setItem('userId', data[0]['id']);
            if (data[0]['role'] === '2') navigate("/Bunch_sklad");
            else navigate("/*");
            
          }
        
          */
        
    };

    return (
        <div>
            <form onSubmit={handlerSubmit}>
                <div className={s.title}>Форма для оформления заказа</div>
                <div className={s.login_wrapper}>
                    <div><input className={s.input} name="address" type="text" placeholder='Адрес доставки' value={user.address} onChange={handlerChange} required /></div>
                    <div><input className={s.input} name="date" type="date" placeholder='Дата доставки' value={user.date} onChange={handlerChange} required /></div>
                    <div><input className={s.input} name="time" type="time" placeholder='Время доставки' value={user.time} onChange={handlerChange} required /></div>
                    <div><input className={s.input} name="comment" type="text" placeholder='Комментарий к заказу' value={user.comment} onChange={handlerChange} required /></div>
                    <div id="answer_for_user_login"></div>
                    <div>
                        <input className={s.button} type="submit" value="Войти" />
                    </div>
                </div>
                
            </form>
        </div>


    )
}

export default DeliverForm
