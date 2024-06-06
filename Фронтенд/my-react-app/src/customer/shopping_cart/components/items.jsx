//import {useState} from "react";
//import {useEffect} from "react";
//import { useNavigate } from "react-router-dom";
import React, { useEffect } from 'react';
import { useState } from 'react';
import Item from "./item";
import s from './deliver.module.css'

const Items = () => {

    const [resList, SetResList] = useState()
    const [isLoading, setIsLoading] = useState(true);
    const [isEmpty, setIsEmpty] = useState(false);
    const [entireCost, setEntireCost] = useState(0);
    //const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        const getShoppingCart = async () => {
            const res = await fetch('http://localhost:1337/api/shopping-cart?user=' + localStorage.getItem('userId'), {
                method: "GET"
            });
            console.log(res.status)
            if (res.status === 400){
                setIsLoading(false)
                setIsEmpty(true)
            } 
            else if (res.ok) {
                const data = await res.json()
                let entire_cost = 0;
                data.map(element => {
                    entire_cost += Number(element["cost"]) * Number(element["count"])
                })
                SetResList(data);
                setEntireCost(entire_cost)
                setIsLoading(false)
          }}
        
          getShoppingCart();
    })

      if (isLoading) {
        return <div>Loading...</div>;
      }

      if (isEmpty) {
        return <div style={{color: '#4E4E4E', fontSize: '20px'}}>Корзина пуста</div>;
      }

    return (
        <div style={{marginTop: '2rem', color: '#4E4E4E'}}>
            <div style={{color: '#4E4E4E', paddingLeft: '2rem', fontSize: '20px'}}>Сумма заказа: {entireCost} ₽</div>
            {resList && resList.map(element => {
              return (
                <Item image={element["image"]} name={element['name']} price={element["cost"]} count={element["count"]} id={element["id"]} bunch_id={element["bunch_id"]}/>
            )})}
        </div>
    )
}

export default Items