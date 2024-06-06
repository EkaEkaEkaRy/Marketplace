import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import s from "./deliver.module.css"
import React from 'react';

const DeliverForm = () => {
    
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
        console.log(value)
        setuser({ ...user, [name]: value })
    }

    const [showElement, setShowElement] = useState(false);

    const handlerSubmit = async (event) => {
        event.preventDefault();
        const id = localStorage.getItem('userId')
        console.log(id)
        const {address, date, time, comment} = user;
        const currentDate = new Date();
        const DateAfterTwoDays = new Date(currentDate.getTime() + (2 * 24 * 60 * 60 * 1000));
        const DateStringAfterTwoDays = DateAfterTwoDays.toISOString().slice(0, 10);
        const DateAfterMounth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, currentDate.getDate());
        const DateStringAfterMounth = DateAfterMounth.toISOString().slice(0, 10);
        if (DateStringAfterTwoDays > date) document.getElementById("answer_for_deliver").innerHTML = "Невозможно осуществить заказ на выбранную дату"
        else if (DateStringAfterMounth < date) document.getElementById("answer_for_deliver").innerHTML = "Невозможно осуществить заказ на выбранную дату"
        else if (time > "22:00" || time < "10:00") document.getElementById("answer_for_deliver").innerHTML = "Невозможно осуществить заказ на выбранное время"
        else {
            const res = await fetch("http://localhost:1337/api/order", {
            method: "POST",
            headers: { "Accept": "application/json", "Content-Type":
                "application/json" },
            body: JSON.stringify({
                id,
                address,
                date,
                time,
                comment
            })
        })

        setuser({ ...user, "address": "" })
        setuser({ ...user, "date": "" })
        setuser({ ...user, "time": "" })
        setuser({ ...user, "comment": "" })

        let timer;
        if (res.status === 201)
            {
                setShowElement(true);
                timer = setTimeout(() => {
                    setShowElement(false);
                }, 3000);
            }
        }  
    };
    
    return (
        <div className={s.form} style={{display: 'flex', justifyContent: 'right'}}>
            {showElement && (
                <div className={s.windon_mes}>
                    Заказ создан
                </div>
            )}
            <form onSubmit={handlerSubmit}>
                <div className={s.title}>Оформить заказ</div>
                <div className={s.login_wrapper}>
                    <div><input className={s.input} name="address" type="text" placeholder='Адрес доставки' value={user.address} onChange={handlerChange} required /></div>
                    <div><input className={s.input} name="date" type="date" placeholder='Дата доставки' value={user.date} onChange={handlerChange} required /></div>
                    <div><input className={s.input} name="time" type="time" placeholder='Время доставки' value={user.time} onChange={handlerChange} required /></div>
                    <div><input className={s.input} name="comment" type="text" placeholder='Комментарий к заказу' value={user.comment} onChange={handlerChange} /></div>
                    <div id="answer_for_deliver" className={s.warn}></div>
                    <div>
                        <input className={s.button} type="submit" value="Заказать" />
                    </div>
                </div>
                
            </form>
        </div>


    )
}

export default DeliverForm
