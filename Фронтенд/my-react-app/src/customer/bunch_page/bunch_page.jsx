import Header from "../catalog/components/header"
import Describtion from "./component/describtion";
import ImageShCart from "./component/image_cart";
import s from "./bunch.module.css"
import React, { useEffect } from 'react';
import { Navigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import arrow from './component/image/left-arrow.png'

const Bunch_page = () => {
  const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const id_bunch = urlParams.get('id');
    console.log(id_bunch)

    const [resList, SetResList] = useState()
    const [isLoading, setIsLoading] = useState(true);

  useEffect (() => {
    const get_one_flower = async () => {
      const res = await fetch('http://localhost:1337/api/one-bunch?bunch=' + id_bunch, {
            method: "GET"
        });
        if (res.ok) {
            const data = await res.json()
            SetResList(data[0]);
            setIsLoading(false)
      }}

      get_one_flower();
  }, [])

  if (localStorage.getItem('user_role') === '2'){
    return <Navigate to="/Login" />
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(resList)

    return (
      <div className={s.back}>
        <div>
            <Header/>
        </div>
        <main className={s.main}>
          <NavLink to="/*"><img src={arrow} alt="Назад" style={{width: '2.5rem', height: '2.5rem', paddingTop: '2rem', paddingLeft: '2rem'}}/></NavLink>
        
        <div className={s.item}>
          <div className={s.wrapper}>
            <div className={s.pos}>
            <Describtion description={resList.description} flowers={resList.flowers} name={resList.name} cost={resList.cost} count={resList.count}/>
            </div>
            <div className={s.pos}>
            <ImageShCart image={resList.image} id={resList.id}/>
            </div>
          </div>
        </div>
        </main>
    </div>
    )
  }
export default Bunch_page