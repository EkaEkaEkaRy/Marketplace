//import { useState } from "react";
//import { useNavigate } from "react-router-dom";
import s from "./describtion.module.css"
import React from 'react';

const Describtion = (props) => {
    function coalesce(value, defaultValue) {
        return value !== undefined && value !== null ? value : defaultValue;
      }

      let description = props.description;
      if(description === "") description = null
    return (
            <div className={s.input}>
            <div style={{display: 'grid', gridTemplateColumns: '3fr 2fr'}}>
            <div className={s.describtion}>
                <div className={s.head}>Название букета</div>
                <div className={s.text}>{props.name}</div>
            </div>
            <div className={s.describtion}>
                <div className={s.head}>Стоимость</div>
                <div className={s.text}>{props.cost} ₽</div>
            </div>
            </div>
            <div className={s.describtion}>
                <div className={s.head}>Описание</div>
                <div className={s.text}>{coalesce(description, "нет")}</div>
            </div>
            <div className={s.describtion_comp}>
                <div className={s.head}>Состав букета</div>
                {JSON.parse(props.flowers).map((element) => {
                    return (<div className={s.text_comp}>{element.name} : {element.quantity}</div>)
                })}
            </div>
            <div className={s.describtion}>
                <div className={s.head}>Букетов в наличии: {props.count}</div>
            </div>
        </div>
    )
}

export default Describtion