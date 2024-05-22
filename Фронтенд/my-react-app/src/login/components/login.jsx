import { useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./login.module.css"
import React from 'react';

const LoginForm = () => {

    const navigate = useNavigate();
    /*
    const [authenticated, setauthenticated] = useState(
        localStorage.getItem(localStorage.getItem("authenticated") || false));
    */
    
    let [user, setuser] = useState({
        login: "",
        password: ""
    })

    let name, value;


    const handlerChange = (event) => {
        name = event.target.name;
        value = event.target.value;
        setuser({ ...user, [name]: value })
    }


    const handlerSubmit = async (event) => {
        event.preventDefault();
        const {login, password} = user;
        const res = await fetch('http://localhost:1337/api/find-user?mail=' + login + '&password=' + password, {
            method: "GET",
            headers: { "Accept": "application/json", "Content-Type":
            "application/json" }
        });
        
        if (res.status === 404) document.getElementById("answer_for_user_login").innerHTML = "пользователя не существует";
        else if (res.status === 400) document.getElementById("answer_for_user_login").innerHTML ="неверный пароль";
        else if (res.ok){
            const data = await res.json();
            if (data[0]['role'] === '2') {
                localStorage.setItem('userId', data[0]['id']);
                localStorage.setItem('user_role', '2')
                navigate("/Bunch_sklad");
            }
            else {
                localStorage.setItem('userId', data[0]['id']);
                localStorage.setItem('user_role', '1')
                navigate("/");
            }
          }
        

        
    };

    return (
        <div className={s.signup}>
            <form className={s.login} onSubmit={handlerSubmit}>
                <div className={s.title}>Вход</div>
                <div className={s.login_wrapper}>
                    <div><input className={s.input} name="login" type="text" placeholder='Почта' value={user.login} onChange={handlerChange} required /></div>
                    <div><input className={s.input} name="password" type="password" placeholder='Пароль' value={user.password} onChange={handlerChange} required /></div>
                    <div id="answer_for_user_login"></div>
                    <div>
                        <input className={s.button} type="submit" value="Войти" />
                    </div>
                </div>
                
            </form>
        </div>


    )
}

export default LoginForm
