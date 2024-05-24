import {useState} from "react";
//import {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import s from "./edit.module.css"
import React from 'react';

const Edit_form = ({profile_info}) => {
    const navigate = useNavigate();
    
    const resList = JSON.parse(profile_info)

    let [user, setuser] = useState({
        name: resList["name"],
        login: resList["mail"],
        phone: resList["phone"],
        password: "",
        password2: "",
    })

    const [image, setImage] = useState(null);

    const handleImageUpload = (event) => {
        setImage(event.target.files[0]);
    };


    let name, value;

    const handlerChange = (event) =>
    {
        name = event.target.name;
        value = event.target.value;
        setuser({ ...user, [name]: value})
    }

    const handlerSubmit1 = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('id', localStorage.getItem('userId'))
        formData.append('name', user.name);
        formData.append('login', user.login)
        formData.append('password', user.password)
        formData.append('phone', user.phone)
        formData.append('image', image);

        if (user.password !== user.password2) document.getElementById("answer_for_user").innerHTML = "Пароли не совпадают"
        else {
            const res = await fetch('http://localhost:1337/api/info-user', {
                method: "PUT",
                body: formData
            });
            const data = await res.json();
            console.log(res.status)
            if (res.status === 404 || !data) document.getElementById("answer_for_user").innerHTML = "Данные введены неверно"
            else if (res.status === 500) document.getElementById("answer_for_user").innerHTML = "Попробуйте позже"
            //setauthenticated(true)
            else if (res.status === 200){
                navigate("/Profile");
            }

            }
            
    };
    return (
        <div className={s.signup}>
            
                <form class="form_auth" method="POST" name="userSignup" onSubmit={handlerSubmit1}>
                    <div className={s.title}>Редактирование</div>
                    <div className={s.login_wrapper}>
                        <div><input className={s.input} name="name" type="text" placeholder='Имя' value = {user.name} onChange={handlerChange} required /></div>
                        <div><input className={s.input} name="login" type="email" placeholder='Почта' value = {user.login} onChange={handlerChange} required /></div>
                        <div><input className={s.input} name="phone" type="phone" placeholder='Номер телефона' value = {user.phone} onChange={handlerChange} required /></div>
                        <div><input type="file" onChange={handleImageUpload} className={s.input}/></div>
                        <div><input className={s.input} name="password" type="password" placeholder='Пароль' value = {user.password} onChange={handlerChange} required /></div>
                        <div><input className={s.input} name="password2" type="password" placeholder='Повторный пароль' value = {user.password2} onChange={handlerChange} required /></div>
                        <div id="answer_for_user"></div>
                        <div>
                                <input className={s.button} type="submit" value={"Создать аккаунт"} />

                        </div>
                    </div>
                </form>
        </div>
    )
}

export default Edit_form