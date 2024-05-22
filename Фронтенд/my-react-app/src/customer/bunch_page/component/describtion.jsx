//import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import s from "./describtion.module.css"
import React from 'react';

const Describtion = (props) => {
    function coalesce(value, defaultValue) {
        return value !== undefined && value !== null ? value : defaultValue;
      }

    return (
        <div className={s.input}>
            <div className={s.describtion}>
                <div className={s.head}>Описание</div>
                <div className={s.text}>{coalesce(props.description, "нет")}</div>
            </div>
        </div>


    )
}

export default Describtion