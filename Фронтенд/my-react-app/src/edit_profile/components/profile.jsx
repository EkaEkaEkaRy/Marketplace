import { useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./profile.module.css"
import React from 'react';
import profile from './image/user-profile.png'

const Person = () => {

    return (
        <div className={s.centerElement}>
                <div className={s.image_form}><img className={s.ava} src={profile} alt="Назад" /></div>
                <div style={{display: 'flex', justifyContent: 'center'}}>{localStorage.getItem('userId')}</div>
        </div>
    )
}

export default Person
