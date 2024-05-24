import { useState } from "react";
import { useNavigate } from "react-router-dom";
import s from "./profile.module.css"
import React from 'react';
import profile from './image/user-profile.png'

const Person = ({profile_info}) => {

    const resList = JSON.parse(profile_info)

    function coalesce(value, defaultValue) {
        return value !== undefined && value !== null && value !== "" ? value : defaultValue;
      }

    return (
            <div className={s.person}><div className={s.container}>
            <div className={s.centerElement}>
                <div className={s.image_form}><img className={s.ava} src={coalesce(resList["image"], profile)} alt="Назад" /></div>
                <div className={s.text_name}>{resList["name"]}</div>
                <div className={s.text_name}>{resList["mail"]}</div>
                <div className={s.text_name}>{resList["phone"]}</div>
            </div>
        </div> 
        </div>       
    )
}

export default Person
