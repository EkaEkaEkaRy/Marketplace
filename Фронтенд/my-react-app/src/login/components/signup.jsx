import {useState} from "react";
//import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import s from "./login.module.css"
import React from 'react';

const Signup = () => {
    const navigate = useNavigate();
    //const [authenticated, setauthenticated] = useState(false);

    let [user, setuser] = useState({
        name: "",
        login: "",
        phone: "",
        password: "",
        password2: "",
    })
    /*
    useEffect(() => {
        localStorage.setItem('authenticated', authenticated);
      }, [authenticated]);

    localStorage.getItem(authenticated)
      */

    let name, value;

    const handlerChange = (event) =>
    {
        name = event.target.name;
        value = event.target.value;
        setuser({ ...user, [name]: value})
    }

    const handlerSubmit1 = async (event) => {
        event.preventDefault();
        console.log(1)
        const {name, login, phone, password, password2} = user;
        const phoneRegex = /^(\+7|8)?((\d{3})[-\s]?)?(\d{3})[-\s]?(\d{2})[-\s]?(\d{2})$/;
        if (password !== password2) document.getElementById("answer_for_user").innerHTML = "Пароли не совпадают"
        else if (!phoneRegex.test(phone)) document.getElementById("answer_for_user").innerHTML = "Неверный формат данных"
        else {
            const res = await fetch('http://localhost:1337/api/create-user', {
                method: "POST",
                headers: { "Accept": "application/json", "Content-Type":
                "application/json" },
                body: JSON.stringify({
                name,
                login,
                phone,
                password,
                })
            });
            console.log(res.status)
            if (res.status === '400') document.getElementById("answer_for_user").innerHTML = "Пользователь уже существует"
            //setauthenticated(true)
            else if (res.ok){
                const data = await res.json();
                console.log(data)
                localStorage.setItem('userId', data[0]['id']);
                localStorage.setItem('user_role', '1')
                navigate("/*");
            }

            }
            
    };
    return (
        <div className={s.signup}>
            <form class="form_auth" method="POST" name="userSignup" onSubmit={handlerSubmit1}>
                <div className={s.title}>Регистрация</div>
                <div className={s.login_wrapper}>
                    <div><input className={s.input} name="name" type="text" placeholder='Имя' value = {user.name} onChange={handlerChange} required /></div>
                    <div><input className={s.input} name="login" type="email" placeholder='Почта' value = {user.login} onChange={handlerChange} required /></div>
                    <div><input className={s.input} name="phone" type="phone" placeholder='Номер телефона' value = {user.phone} onChange={handlerChange} required /></div>
                    <div><input className={s.input} name="password" type="password" placeholder='Пароль' value = {user.password} onChange={handlerChange} required /></div>
                    <div><input className={s.input} name="password2" type="password" placeholder='Повторный пароль' value = {user.password2} onChange={handlerChange} required /></div>
                    <div id="answer_for_user" className={s.warn}></div>
                    <div>
                            <input className={s.button} type="submit" value={"Сохранить"} />

                    </div>
                </div>
            </form>
        </div>
    )
}

export default Signup